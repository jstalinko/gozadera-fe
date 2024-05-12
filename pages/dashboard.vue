<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />

        
        <!-- menu main -->
        <div class="main-menu">
            <div class="row mb-4 no-gutters">
                <div class="col-auto"><button class="btn btn-link btn-40 btn-close text-white"><span class="material-icons">chevron_left</span></button></div>
                <div class="col-auto">
                    <div class="avatar avatar-40 rounded-circle position-relative">
                        <figure class="background">
                            
                            <img src="/img/banteng_gold_no_bg.png" alt="" class="avatar-img">
                        </figure>
                    </div>
                </div>
                <div class="col pl-3 text-left align-self-center">
                    <h6 class="mb-1">Errica Johnson</h6>
                    <p class="small text-default-secondary">London, UK</p>
                </div>
            </div>
         
        </div>
        <div class="backdrop"></div>


        <!-- Begin page content -->
        <main class="flex-shrink-0 main has-footer">
            <!-- Fixed navbar -->
            <header class="header">
                <div class="row">
                    
                    <div class="text-left col align-self-center">
                        
                            <NuxtLink to="/dashboard" class="navbar-brand">
                                <h5 class="mb-0 text-gozadera">
                                    Gozadera
                                </h5>
                            </NuxtLink>
                    </div>
                    <div class="text-right col align-self-center">
                        <!-- notification -->
                        <button class="btn btn-default text-white" @click="navigateTo('/notifications')">
                            <span class="material-icons">notifications</span>
                            <!-- badge -->
                            <span class="badge badge-danger badge-pill">3</span>
                        </button>
                        <button class="btn btn-link text-danger" @click="logout">
                            <span class="material-icons">logout</span>
                        </button>
                        </div>
                    
                </div>
            </header>

            <div class="container mb-4 text-center">
                

                <img src="/img/banteng_gold_no_bg.png" alt="" class="icon icon-150">
                <h5 class="subtitle text-white">Welcome back <i>{{ user?.name }}!</i> </h5>
                <div class="card rounded-pill">
                    <div class="card-body bg-gozadera rounded-pill">
                       <div class="row">
                            <div class="col border-right">
                                <span class="text-justify text-white">
                                <i class="material-icons vm md-24 text-template">liquor</i>
                                My Bottles
                                <br>
                                <b>10</b>
                                </span>

                            </div>
                            <div class="col border-left">
                                <span class="text-justify text-white">
                                <i class="material-icons vm md-24 text-template">account_balance_wallet</i>
                                My Points
                                <br>
                                <b>
                                    {{ currencyFormat(user.point) }}
                                </b>
                                </span>

                            </div>


                       </div>
                    </div>

                </div>

                <div class="row justify-content-between mt-3">
                    <div class="col-xs-3">
                        <div class="card rounded" @click="navigateTo('/my-ticket')">
                            <div class="card-body bg-gozadera rounded text-white">
                                <i class="material-icons vm md-24 text-template">confirmation_number</i>
                                <br>
                                <b>My Ticket</b>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="card rounded" @click="navigateTo('/my-bottles')">
                            <div class="card-body bg-gozadera rounded text-white">
                                <i class="material-icons vm md-24 text-template">liquor</i>
                                <br>
                                <b>My Bottles</b>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="card rounded" @click="navigateTo('/outlets')">
                            <div class="card-body bg-gozadera rounded text-white">
                                <i class="material-icons vm md-24 text-template">map</i>
                                <br>
                                <b>Outlets</b>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="card rounded" @click="navigateTo('/rsvp')">
                            <div class="card-body bg-gozadera rounded text-white">
                                <i class="material-icons vm md-24 text-template">calendar_month</i>
                                <br>
                                <b>RSVP</b>
                            </div>
                        </div>
                    </div>
                </div>
               

            </div>

            <div class="main-container">
            <Carousel :banners="banners"/>
               
             

              <div class="container mb-4">
                <h3 class="subtitle text-white mb-4">Special Offers</h3>
                <div class="row justify-content-between">
                    <div class="col-6 mb-3">
                        <div class="card overflow-hidden shadow-gozadera">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                  <div class="border rounded m-2 p-2 background-text">
                                    <h3 class="font-weight-normal">Events</h3>
                                    <p class="text-mute">
                                        Upto 70% off
                                    </p>
                                    <a href="" class="btn btn-sm btn-default rounded mt-3">Show Now</a>
                                  </div>
                                </div>
                            </div>
                            
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card overflow-hidden shadow-gozadera">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                  <div class="border rounded m-2 p-2 background-text">
                                    <h3 class="font-weight-normal">Everyday</h3>
                                    <p class="text-mute">
                                        Everyday promo
                                    </p>
                                    <a href="" class="btn btn-sm btn-default rounded mt-3">Show Now</a>
                                  </div>
                                </div>
                            </div>
                            
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card overflow-hidden shadow-gozadera">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                  <div class="border rounded m-2 p-2 background-text">
                                    <h3 class="font-weight-normal">Weekday</h3>
                                    <p class="text-mute">
                                        Weekday promo
                                    </p>
                                    <a href="" class="btn btn-sm btn-default rounded mt-3">Show Now</a>
                                  </div>
                                </div>
                            </div>
                            
                    </div>
                    <div class="col-6 mb-3">
                        <div class="card overflow-hidden shadow-gozadera">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                  <div class="border rounded m-2 p-2 background-text">
                                    <h3 class="font-weight-normal">Weekend</h3>
                                    <p class="text-mute">
                                        Special Weekend promo2
                                    </p>
                                    <a href="" class="btn btn-sm btn-default rounded mt-3">Show Now</a>
                                  </div>
                                </div>
                            </div>
                            
                    </div>
                </div>
                </div>


                <div class="container">
                    <div class="card bg-gozadera">
                        <div class="card-header bg-gozadera-gradient">
                            <div class="mb-0 text-white text-center">
                                <h4>TOP 10 SPENDER</h4>
                                <b class="text-white">
                                    LEADERBOARD
                                </b>
                            </div>
                        </div>
                        <div class="card-body px-0 pt-0">
                            <div class="list-group list-group-flush border-top border-color ">
                                <li class="list-group-item bg-gozadera-gradient border rounded-pill p-2 w-90 mb-1 mt-1 m-1" v-for="(spend,index) in spenders"> 
                                    <span class="float-left text-white">
                                        <h6><span class="border-right bg-secondary text-white p-2 rounded-circle">{{ index+1 }} .</span> {{ spend.username }}</h6>
                                    </span>
                                    <span class="p-2">
                                        {{ currencyFormat(spend.total_payment) }}
                                    </span>

                                    <span class="float-right badge badge-secondary badge-pill p-2">
                                        {{ spend.level }}
                                    </span>
                                </li>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    
        <FooterMenu :activeMenu="'dashboard'"/>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
setTimeout(() => {
    isLoading.value = false;
}, 100);


definePageMeta({
    title: 'Dashboard',
    meta: [
        {
            name: 'description',
            content: 'Dashboard page'
        }
    ],
    middleware: 'auth'
});
const user = useUser();


const logout = () => {
    const token = useCookie('token');
    token.value = null;
    const user = useCookie('user');
    user.value = null;
    const router = useRouter();
    router.push('/login');

}

const spenders = ref([]);
const topSpender = async () => {
    const response = await $fetch('/api/top-spender');
    if(response.status == 'success'){
        spenders.value = response.data;
    }else{
        spenders.value = [];
    }
}
const banners = ref([]);
onMounted( async () => {
    topSpender();
    const token = useCookie('token').value;
    let bannerResponse = await Banners(token);
    if(bannerResponse.status == 'success'){
        banners.value = bannerResponse.data;
        console.log(banners.value);
    }else{
        banners.value = [];
    }

});

</script>