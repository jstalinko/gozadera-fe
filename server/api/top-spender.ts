export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const response = await $fetch(`${config.public.apiUrl}/top-spender` , {method:'GET'});
    return response;
    
});