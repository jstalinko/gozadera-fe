export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const { token , event_id } = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/gallery/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    return response;
});