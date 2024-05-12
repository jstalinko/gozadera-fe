export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig(event);
  const response = await $fetch(`${config.public.apiUrl}/login` , {method:'POST' , body: {
    email: email,
    password: password
  }});
  return response;
    
});
