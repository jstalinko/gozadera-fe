export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const {token} = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/banners` , {method:'GET', headers: {
        'Authorization': `Bearer ${token}`
    }});
    return response;    
});
