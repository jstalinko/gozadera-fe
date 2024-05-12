export const currencyFormat = (value: number) => {
  if (value > 1000) {
    var total = value / 1000;
    // change . to ,
    return total.toFixed(2).toString().replace(".", ",") + " K";
  }
};

export const Banners = async (token: string) => {
  const response = await $fetch(`/api/banners`, {
    method: "POST",
    body: {
      token: token,
    },
  });
  return response;
};

export const member = () => {
    const user = useUser();
    return user.value;
}

export const imageUrl = (url: string) => {
    const config = useRuntimeConfig();
    var baseUrl = config.public.apiUrl.replace("/api", "/storage/");
    if(url?.match(/http/g)){
        return url;
    }else{
        return baseUrl + url;
    }
}

export const numberify = (value: number) => {
  if(value == 1)
  {
    return value + "st";
  }else if(value == 2){
    return value + "nd";
  }else if(value == 3){
    return value + "rd";
  }else if(value > 3){
    return value + "th";
  }
  return value;
}