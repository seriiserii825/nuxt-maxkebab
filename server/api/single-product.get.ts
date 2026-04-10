export default defineEventHandler(async (event) => {
  const { lang, slug } = getQuery(event);
  const wp = useWpFetch(event, lang as string);
  return wp.get("/product/v1/single-product", { slug });
});
