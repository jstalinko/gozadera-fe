export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const {
    username,
    email,
    phone,
    address,
    newPassword,
    currentPassword,
    token,
  } = await readBody(event);
  const response = await $fetch(`${config.public.apiUrl}/update-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: {
      username: username,
      email: email,
      phone: phone,
      address: address,
      token: username,
      newPassword: newPassword,
      currentPassword: currentPassword,
    },
  });
  return response;
});
