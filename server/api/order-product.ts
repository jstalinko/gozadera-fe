export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { token, table_id, outlet_id, member_id, items } = await readBody(
    event
  );

  const response = await $fetch(`${config.public.apiUrl}/order-product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: {
      table_id,
      outlet_id,
      member_id,
      items,
    },
  });
  return response;
});
