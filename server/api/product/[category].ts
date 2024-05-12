export default defineEventHandler(async (event) => {
    const category  = event?.context?.params?.category
    const config = useRuntimeConfig(event);
    const response = await $fetch(`${config.public.apiUrl}/category/${category}` , {method:'GET'});
    return response;
    
});