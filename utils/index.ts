export const currencyFormat = (value: number) => {
  if (value > 1000) {
    var total = value / 1000;
    // change . to ,
    return total.toFixed(2).toString().replace(".", ",") + " K";
  }else{
    return value;
  }
};
export const idrFormat = (value: number) => {
  return new Intl.NumberFormat("en-ID").format(
    value
  );
};



export const member = () => {
  const user = useUser();
  return user.value;
};

export const imageUrl = (url: string) => {
  const config = useRuntimeConfig();
  var baseUrl = config.public.apiUrl.replace("/api", "/storage/");
  if (url !== undefined) {
    if (url.match(/http|https/g)) {
      return url;
    } else {
      return baseUrl + url;
    }
  } else {
    return url;
  }
};

export const numberify = (value: number) => {
  if (value == 1) {
    return value + "st";
  } else if (value == 2) {
    return value + "nd";
  } else if (value == 3) {
    return value + "rd";
  } else if (value > 3) {
    return value + "th";
  }
  return value;
};

export const saveLocalStorage = (key: string, value: any) => {
  if(process.client){
    localStorage.setItem(key, value);
  }else{
    return;
  }
}

export const getLocalStorage = (key: string) =>{
  if(process.client){
    return localStorage.getItem(key);
  }else{
    return;
  }
}
export const logout = () => {
  const token = useCookie('token');
  token.value = null;
  const user = useCookie('user');
  user.value = null;
  const router = useRouter();
  router.push('/login');

}

export const humanifyDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}