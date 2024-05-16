export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { type, token } = await readBody(event);
  const response = await $fetch(
    `${config.public.apiUrl}/get-payments/${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
});
