export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const {token,data,outlet_id,user_id,rsvp_date, payment_method} = await readBody(event);
    const response = await $fetch(`${config.public.apiUrl}/rsvp-multi`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: {
            data: data,
            outlet_id: outlet_id,
            user_id: user_id,
            rsvp_date: rsvp_date,
            payment_method: payment_method,
        }
    });

    return response;
});