export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const {token} = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/product-redeemables` , {method:'GET', headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }});
    return response;    
});