export function useWpFetch(event: Parameters<typeof getCookie>[0], lang?: string) {
  const config = useRuntimeConfig();
  const token = getCookie(event, "token");
  const defaultLocale = "ro";

  const apiBase =
    lang && lang !== defaultLocale
      ? config.public.apiBase.replace("/wp-json", `/${lang}/wp-json`)
      : config.public.apiBase;

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
      return $fetch<T>(`${apiBase}${path}`, { headers, params, timeout: 5000 }).catch(
        handleError,
      );
    },

    post<T = unknown>(path: string, body: unknown) {
      return $fetch<T>(`${apiBase}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        timeout: 5000,
      }).catch(handleError);
    },
  };
}
