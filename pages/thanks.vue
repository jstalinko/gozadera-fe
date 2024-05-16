<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading"/>
        <Header/>

        
            <div class="container container-fluid ">
                <div class="row mt-5">
                    <div class="col-12 col-md-6 col-lg-4 align-self-center text-center my-3 mx-auto">
                        <div class="icon icon-120 bg-success-light text-success rounded-circle mb-3">
                            <i class="material-icons display-4">redeem</i>
                        </div>
                        <h2 class="text-white">Thank you!</h2>
                        <h6 class="text-gozadera mb-3">{{ message }} </h6>
                        <p class="text-gozadera">{{ messageLong }}</p>
                    </div>
                </div>
            </div>
        

        <FooterMenu activeMenu="''" />
    </div>
</template>


<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
setTimeout(() => {
    isLoading.value = false;
}, 500);
const route = useRoute();
const message = ref('Your order has been placed');
const messageLong = ref('Thank you for buying products your order will be delivered soon by our waiters.');
const redirect = ref('/');
if(route.query.ref == 'restaurant'){
    message.value = 'Your order has been placed';
    messageLong.value = 'Thank you for buying products your order will be delivered soon by our waiters.';
    redirect.value = '/notifications';
}else if(route.query.ref == 'rsvp'){
    message.value = 'Your reservation has been placed';
    messageLong.value = 'Thank you for making a reservation, we will contact you soon to confirm your reservation.';
    redirect.value = '/my-ticket';
}

onMounted(() => {
       
    setTimeout(() => {

        return location.href = redirect.value;
        
    }, 4000);
});


</script>