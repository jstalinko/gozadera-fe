<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />


        <!-- menu main -->
        <div class="main-menu">
            <div class="row mb-4 no-gutters">
                <div class="col-auto"><button class="btn btn-link btn-40 btn-close text-white"><span
                            class="material-icons">chevron_left</span></button></div>
                <div class="col-auto">
                    <div class="avatar avatar-40 rounded-circle position-relative">
                        <figure class="background">

                            <img src="/img/banteng_gold_no_bg.png" alt="" class="avatar-img">
                        </figure>
                    </div>
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
                        <!-- <button class="btn btn-default text-white" @click="navigateTo('/notifications')">
                            <span class="material-icons">shopping_cart</span>
                        </button> -->
                        <button class="btn btn-link text-danger" @click="logout">
                            <span class="material-icons">logout</span>
                        </button>
                    </div>

                </div>
            </header>

            <div class="container mb-4 text-center">


                <img src="/img/banteng_gold_no_bg.png" alt="" class="icon icon-150">
                <h5 class="subtitle text-white">Welcome back <i>{{ user?.name }}!</i> </h5>
                <div class="card rounded-pill" @click="navigateTo('/my-bottles')">
                    <div class="card-body bg-gozadera rounded-pill">
                        <div class="row">
                            <div class="col border-right">
                                <span class="text-justify text-white">
                                    <i class="material-icons vm md-24 text-template">liquor</i>
                                    My Bottles
                                    <br>
                                    <b>
                                        {{ countMyBottle }}
                                    </b>
                                </span>

                            </div>
                            <div class="col border-left">
                                <span class="text-justify text-white">
                                    <i class="material-icons vm md-24 text-template">account_balance_wallet</i>
                                    My Points
                                    <br>
                                    <b>
                                        {{ currencyFormat(userPoint) }}
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
                        <div class="card rounded" @click="navigateTo('/outlets')">
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
                <Carousel :banners="banners" />



                <div class="container mb-4">
                    <h3 class="subtitle text-white mb-4">Special Offers</h3>
                    <div class="row justify-content-between">
                        <div class="col-6 mb-3">
                            <div class="card overflow-hidden shadow-gozadera" @click="navigateTo('/offers/event')">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                    <div class="border rounded m-2 p-2 background-text">
                                        <h5 class="font-weight-normal">Events</h5>
                                        <p class="text-mute">
                                            Upto 70% off
                                        </p>
                                        <NuxtLink to="/offers/event" class="btn btn-sm btn-default rounded mt-3">Show
                                            Now</NuxtLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-6 mb-3">
                            <div class="card overflow-hidden shadow-gozadera" @click="navigateTo('/offers/everyday')">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                    <div class="border rounded m-2 p-2 background-text">
                                        <h5 class="font-weight-normal">Everyday</h5>
                                        <p class="text-mute">
                                            Everyday promo
                                        </p>
                                        <NuxtLink to="/offers/everyday" class="btn btn-sm btn-default rounded mt-3">Show
                                            Now</NuxtLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-6 mb-3">
                            <div class="card overflow-hidden shadow-gozadera" @click="navigateTo('/offers/weekday')">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                    <div class="border rounded m-2 p-2 background-text">
                                        <h5 class="font-weight-normal">Weekday</h5>
                                        <p class="text-mute">
                                            Weekday promo
                                        </p>
                                        <NuxtLink to="/offers/weekday" class="btn btn-sm btn-default rounded mt-3">Show
                                            Now</NuxtLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-6 mb-3">
                            <div class="card overflow-hidden shadow-gozadera" @click="navigateTo('/offers/weekend')">
                                <div class="background" style="background-image: url('/img/event/kanan.jpeg');">
                                    <img src="/img/event/kanan.jpeg" alt="" style="display: none;">
                                </div>
                                <div class="card-body py-4 text-white border">
                                    <div class="border rounded m-2 p-2 background-text">
                                        <h5 class="font-weight-normal">Weekend</h5>
                                        <p class="text-mute">
                                            Weekend promo
                                        </p>
                                        <NuxtLink to="/offers/weekend" class="btn btn-sm btn-default rounded mt-3">Show
                                            Now</NuxtLink>
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
                                <div v-show="spenders.length > 0 ">
                                    <li class="list-group-item bg-gozadera-gradient border rounded-pill p-2 w-90 mb-1 mt-1 m-1"
                                    v-for="(spend, index) in spenders">
                                    <span class="float-left text-white">
                                        <h6><span class="border-right bg-secondary text-white p-2 rounded-circle">{{
                                            index + 1 }} .</span> {{ spend.username }}</h6>
                                    </span>
                                    <span class="p-2">
                                        {{ currencyFormat(spend.total_payment) }}
                                    </span>

                                    <span class="float-right badge badge-secondary badge-pill p-2">
                                        {{ spend.level }}
                                    </span>
                                </li>
                            </div>
                            <div v-show="spenders.length == 0">
                                <h3 class="text-center"> 
                                    No data
                                </h3>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>


        <FooterMenu :activeMenu="'dashboard'" />
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const countMyBottle = ref(0);
const user = useUser();
const spenders = ref([]);
const banners = ref([]);
const userPoint = ref(user.value.point);

setTimeout(() => {
    isLoading.value = false;
}, 700);

// refresh page
const refreshPage = () => {
    location.reload();
}


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




const topSpender = async () => {
    try {
        const response = await $fetch('/api/top-spender');
        if (response.status == 'success') {
            spenders.value = response.data;
        } else {
            spenders.value = [];
        }
    } catch (e) {
        spenders.value = [];
    }

}

const myBottles = async () => {
    try {
        const user = useCookie('user');
        const response = await $fetch('/api/my-bottles', {
            method: 'POST',
            body: {
                token: useCookie('token').value,
                memberId: user.value.id
            }
        });

        if (response.status == 'success') {
            countMyBottle.value = response.data.length;
        } else {
            countMyBottle.value = 0;
        }
    } catch (e) {
        countMyBottle.value = 0;
    }

}

const getProfile = async () => {
    const body = await $fetch('/api/profile', {
        method: 'POST',
        body: {
            token: useCookie('token').value
        }
    });
    if (body.status == 'success') {
        let userUpdate = useCookie('user');
        userUpdate.value = JSON.stringify({
            id: body.data.id,
            name: body.data.username,
            email: body.data.email,
            status: body.data.status,
            image: body.data.image,
            point: body.data.point,
            phone: body.data.phone,
            qrcode: body.data.qrcode,
            address: body.data.address
        });
        userPoint.value = body.data.point;
    }
}
const Banners = async () => {
    const token = useCookie('token').value
    const response = await $fetch(`/api/banners`, {
        method: "POST",
        body: {
            token: token,
        },
    });
    if (response.status == 'success') {
        banners.value = response.data;
    } else {
        banners.value = [];
    }

}

onMounted(async () => {

    await Banners();
    await topSpender();
    await myBottles();
    await getProfile();


});

</script>