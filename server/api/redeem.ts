export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const { token , redeem_id,product_id } = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:{
        redeem_id:redeem_id,
        product_id:product_id
      }
    });
  
    return response;

});