export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { token, memberId } = await readBody(event);
  const response = await $fetch(`${config.public.apiUrl}/my-bottles?member_id=${memberId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  return response;
});
