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

  function handleError(err: any): never {
    throw createError({
      statusCode: err?.response?.status ?? 500,
      message: err?.data?.message ?? err?.message ?? "WordPress API error",
    });
  }

  return {
    get<T = unknown>(path: string, params?: Record<string, string>) {
      return $fetch<T>(`${config.public.apiBase}${path}`, { headers, params, timeout: 5000 }).catch(
        handleError,
      );
    },

    post<T = unknown>(path: string, body: unknown) {
      return $fetch<T>(`${config.public.apiBase}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        timeout: 5000,
      }).catch(handleError);
    },
  };
}
