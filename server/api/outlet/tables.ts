export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { token, outlet_id , floor , rsvp_date} = await readBody(event);
  const response = await $fetch(
    `${config.public.apiUrl}/outlet-tables-floor/${outlet_id}/${floor}?rsvp_date=${rsvp_date}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
});
