export default defineEventHandler(async (event) => {
  const wp = useWpFetch(event);
  return wp.get("/global/v1/footer");
});
