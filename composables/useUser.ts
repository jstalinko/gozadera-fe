
export const useUser = () => {
    const userCookie = useCookie('user');
    return useState('user', () => userCookie);
  }