export default defineEventHandler(async (event) => {
  const { locale, exclude } = getQuery(event);
  const wp = useWpFetch(event, locale as string);
  return wp.get("/product/v1/random-products", { exclude });
});
