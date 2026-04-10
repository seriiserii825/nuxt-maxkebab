import type { H3Event } from "h3";

/**
 * Proxy utility for WooCommerce Store API v1 (/wc/store/v1/).
 *
 * Authentication / nonce strategy
 * ────────────────────────────────
 * WooCommerce Store API requires a `Nonce` header for every mutating request.
 * This nonce is tied to the WordPress session and cannot be reliably obtained
 * server-to-server via a GET pre-flight (WP session context differs between
 * the two Node.js → PHP requests).
 *
 * WooCommerce SKIPS the nonce check entirely when an `Authorization` header is
 * present (`AbstractRoute::has_auth_credentials`).  Sending a non-standard
 * Bearer token (`Bearer cart-proxy`) satisfies that check without actually
 * authenticating anyone: WordPress has no built-in handler for this Bearer
 * scheme, so `determine_current_user` returns 0 (guest) and the cart session
 * is resolved from the forwarded `woocommerce_session_*` cookie as normal.
 *
 * ⚠️  If the WordPress site has a JWT-auth plugin installed the plugin may
 *    reject the invalid Bearer token with a 401.  In that case, add the
 *    following filter to the theme's functions.php instead:
 *
 *      add_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );
 *
 * Session cookie lifecycle
 * ────────────────────────
 * • The client's cookies (including `woocommerce_session_*`) are forwarded to
 *   WooCommerce on every request so the same cart is used.
 * • Any `Set-Cookie` headers issued by WooCommerce are propagated back to the
 *   browser so the session persists across page loads.
 */
export function useStoreApiFetch(event: H3Event) {
  const config = useRuntimeConfig();
  const baseUrl = `${config.public.wooUrl}/wp-json/wc/store/v1`;

  const incomingCookie = getHeader(event, "cookie") ?? "";

  /** Propagate WooCommerce Set-Cookie headers back to the browser. */
  function forwardSetCookie(headers: Headers): void {
    // Node 18+ Headers.getSetCookie() returns each Set-Cookie as a separate
    // string, avoiding the ambiguity of comma-splitting.
    const cookies: string[] =
      typeof (headers as any).getSetCookie === "function"
        ? (headers as any).getSetCookie()
        : (headers.get("set-cookie") ?? "")
            .split(/,(?=\s*\w+=)/)
            .filter(Boolean);

    for (const c of cookies) {
      appendResponseHeader(event, "set-cookie", c.trim());
    }
  }

  // Shared headers required by the WordPress rest_authentication_errors filter.
  const wpHeaders = {
    "X-WP-Secret": config.wpApiSecret as string,
  };

  /** GET /wc/store/v1/<path> */
  async function get<T = unknown>(path: string): Promise<T> {
    const res = await $fetch.raw<T>(`${baseUrl}${path}`, {
      headers: { ...wpHeaders, cookie: incomingCookie },
    });
    forwardSetCookie(res.headers);
    return res._data as T;
  }

  /** POST /wc/store/v1/<path> */
  async function post<T = unknown>(path: string, body: unknown): Promise<T> {
    const res = await $fetch.raw<T>(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        ...wpHeaders,
        cookie: incomingCookie,
        "Content-Type": "application/json",
        // Bearer token bypasses WC nonce check (has_auth_credentials returns true)
        // while WordPress resolves the session from the forwarded cookie as guest.
        Authorization: "Bearer cart-proxy",
      },
      body: JSON.stringify(body),
      ignoreResponseError: true,
    });
    forwardSetCookie(res.headers);
    if (!res.ok) {
      const errData = res._data as any;
      console.error(`[storeApi] POST ${path} failed ${res.status}:`, JSON.stringify(errData, null, 2));
      const err: any = new Error(errData?.message ?? `HTTP ${res.status}`);
      err.status = res.status;
      err.data = errData;
      throw err;
    }
    return res._data as T;
  }

  /** DELETE /wc/store/v1/<path> */
  async function del<T = unknown>(path: string): Promise<T> {
    const res = await $fetch.raw<T>(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: { ...wpHeaders, cookie: incomingCookie, Authorization: "Bearer cart-proxy" },
      ignoreResponseError: true,
    });
    forwardSetCookie(res.headers);
    return res._data as T;
  }

  return { get, post, del };
}
