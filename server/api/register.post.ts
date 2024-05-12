export default defineEventHandler(async (event) => {
    const { email, username,phone } = await readBody(event);
    const config = useRuntimeConfig(event);
    const response = await $fetch(`${config.public.apiUrl}/register` , {method:'POST' , body: {
      email: email,
      username: username,
      phone: phone
    }});
    return response;
      
  });
  