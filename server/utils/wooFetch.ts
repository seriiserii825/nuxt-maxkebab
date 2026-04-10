export function useWooFetch(lang?: string) {
  const config = useRuntimeConfig();
  const defaultLocale = "ro";
  const wooUrl = config.public.wooUrl as string;
  const base = lang && lang !== defaultLocale
    ? wooUrl.replace(/\/?$/, `/${lang}`)
    : wooUrl;
  const baseUrl = `${base}/wp-json/wc/v3`;
  const headers = { "X-WP-Secret": config.wpApiSecret };

  return {
    get<T = unknown>(path: string, params: Record<string, string> = {}) {
      return $fetch<T>(`${baseUrl}${path}`, { params, headers });
    },

    post<T = unknown>(path: string, body: unknown) {
      return $fetch<T>(`${baseUrl}${path}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },

    put<T = unknown>(path: string, body: unknown) {
      return $fetch<T>(`${baseUrl}${path}`, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },

    async getRaw<T = unknown>(path: string, params: Record<string, string> = {}) {
      const res = await $fetch.raw<T>(`${baseUrl}${path}`, { params, headers });
      return {
        data: res._data as T,
        total: Number(res.headers.get("x-wp-total") ?? 0),
        totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
      };
    },
  };
}
