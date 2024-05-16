export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const { token } = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  
    return response;
});