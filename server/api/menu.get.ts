export default defineEventHandler(async (event) => {
  const { lang } = getQuery(event);
  const wp = useWpFetch(event, lang as string);
  return wp.get("/global/v1/menu");
});
