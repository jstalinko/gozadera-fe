export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { token } = await readBody(event);
  const id =  getRouterParam(event, "id");
  const response = await $fetch(`${config.public.apiUrl}/outlet/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
});
