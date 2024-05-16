export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const { token , category } = await readBody(event);
    var apiMethod = '/event';
    if(category == null )
    {
        apiMethod = '/event';
    }else{
        apiMethod = '/event/'+category;
    }
    const response = await $fetch(`${config.public.apiUrl}${apiMethod}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response;
});