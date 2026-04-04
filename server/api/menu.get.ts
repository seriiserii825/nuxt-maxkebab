export default defineEventHandler(async (event) => {
  const wp = useWpFetch(event);

  try {
    return await wp.get("/global/v1/menu");
  } catch (err: any) {
    throw createError({ statusCode: err?.status ?? 500, message: err?.message });
  }
});
