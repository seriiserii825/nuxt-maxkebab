export function useWpFetch(event: Parameters<typeof getCookie>[0]) {
  const config = useRuntimeConfig();
  const token = getCookie(event, "token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-WP-Secret": config.wpApiSecret,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    get<T = unknown>(path: string, params?: Record<string, string>) {
      return $fetch<T>(`${config.public.apiBase}${path}`, { headers, params });
    },

    post<T = unknown>(path: string, body: unknown) {
      return $fetch<T>(`${config.public.apiBase}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
    },
  };
}
