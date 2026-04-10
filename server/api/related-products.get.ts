export default defineEventHandler(async (event) => {
  const { locale, term_id, product_id } = getQuery(event);
  const wp = useWpFetch(event, locale as string);
  return wp.get("/product/v1/related-products", { term_id, product_id });
});
