import { createHmac } from "node:crypto";

export function useWooFetch() {
  const config = useRuntimeConfig();
  const baseUrl = `${config.public.wooUrl}/wp-json/wc/v3`;

  const encode = (s: string) => encodeURIComponent(s);

  function sign(method: string, url: string, params: Record<string, string>) {
    const oauthParams: Record<string, string> = {
      oauth_consumer_key: config.wooKey,
      oauth_nonce: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
      oauth_signature_method: "HMAC-SHA256",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_version: "1.0",
    };

    const allParams = { ...params, ...oauthParams };
    const paramString = Object.keys(allParams)
      .sort()
      .map((k) => `${encode(k)}=${encode(allParams[k])}`)
      .join("&");

    const baseString = `${method.toUpperCase()}&${encode(url)}&${encode(paramString)}`;
    const signingKey = `${encode(config.wooSecret)}&`;
    const signature = createHmac("sha256", signingKey).update(baseString).digest("base64");

    return { ...params, ...oauthParams, oauth_signature: signature };
  }

  return {
    get<T = unknown>(path: string, params: Record<string, string> = {}) {
      const url = `${baseUrl}${path}`;
      return $fetch<T>(url, {
        params: sign("GET", url, params),
        headers: { "X-WP-Secret": config.wpApiSecret },
      });
    },

    post<T = unknown>(path: string, body: unknown) {
      const url = `${baseUrl}${path}`;
      return $fetch<T>(url, {
        method: "POST",
        params: sign("POST", url, {}),
        headers: { "X-WP-Secret": config.wpApiSecret, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },

    put<T = unknown>(path: string, body: unknown) {
      const url = `${baseUrl}${path}`;
      return $fetch<T>(url, {
        method: "PUT",
        params: sign("PUT", url, {}),
        headers: { "X-WP-Secret": config.wpApiSecret, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },

    async getRaw<T = unknown>(path: string, params: Record<string, string> = {}) {
      const url = `${baseUrl}${path}`;
      const res = await $fetch.raw<T>(url, {
        params: sign("GET", url, params),
        headers: { "X-WP-Secret": config.wpApiSecret },
      });
      return {
        data: res._data as T,
        total: Number(res.headers.get("x-wp-total") ?? 0),
        totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
      };
    },
  };
}
