<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />

        

        <div class="container container-fluid mb-5">
            <h3 class="text-white border text-center mt-3 mb-4 rounded-pill"> {{ route.params.category.toUpperCase() }} </h3>

            <div v-show="route.params.category == 'event'">
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item" >
                    <a :class="(isNav == 'upcoming') ? 'nav-link active' : 'nav-link'" role="button" @click="changeNav('upcoming')">Up Coming</a>
                </li>
                <li class="nav-item" >
                    <a :class="(isNav == 'ongoing') ? 'nav-link active' : 'nav-link'" role="button" @click="changeNav('ongoing')">On Going</a>
                </li>
                <li class="nav-item">
                    <a :class="(isNav == 'finished') ? 'nav-link active' : 'nav-link'" 
                        role="button" @click="changeNav('finished')">Finished</a>
                </li>

            </ul>
        </div>


            <div v-if="eventData.length < 1" class="alert alert-warning mt-5" role="alert">
                No Events found
            </div>
          
            <div class="row mt-2 mb-5" v-show="route.params.category == 'event'">
                <div class="col-12 m-2" v-for="p in eventData">

                    <div class="card bg-dark text-white shadow" >
                        <img :src="imageUrl(p.image)" class="card-img-top" :alt="p.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ p.name }}</h5>
                            <p class="card-text">
                                <span> <i class="material-icons">calendar_today</i> {{ humanifyDate(p.start_date) }} - {{ humanifyDate(p.end_date) }}</span>
                            </p>
                            <p class="card-text">
                                {{ p.description }}
                            </p>
                            <NuxtLink :to="'/rsvp/'+p.outlet_id+'?startDate='+p.start_date+'&endDate='+p.end_date" class="btn btn-default btn-block" v-show="p.status !== 'finished'">
                                <i class="material-icons">calendar_month</i> RSVP 
                            </NuxtLink>
                            <NuxtLink  :to="'/gallery/'+p.id" class="btn btn-danger btn-block" v-show="p.status == 'finished'">
                                <i class="material-icons">image</i> Gallery
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="row mt-4" v-show="route.params.category !== 'event'">
                <div class="col-6 col-md-4 col-lg-3" v-for="product in eventData">
                    <div class="card border-0 mb-4 overflow-hidden bg-dark text-white">
                        <img :src="imageUrl(product.image)" :alt="product.name" class="card-img-top">
                        <div class="card-body ">
                            
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <button class="btn btn-block bg-gozadera rounded" data-toggle="modal" data-target="#showModal">
                            <i class="material-icons">bolt</i> Get Promo
                            </button>
                        </div>

                    </div>
                </div>

            </div>


        </div>
        <br><br>
        <FooterMenu activeMenu="''" />
        <div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">
                            How to get promo?
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                            <h5>1. Choose your favorite promo</h5>
                            <h5><b>2. Call the waiters in the outlets </b></h5>
                            <h5>3. Show the this promo </h5>
                            <h5>4. The waiters will explain the promo</h5>
                            <h5>5. Enjoy your promo</h5>
                        
                    </div>
                    </div>
                    </div>
                    </div>

    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const route = useRoute();
setTimeout(() => {
    isLoading.value = false;
}, 200);
const eventData = ref([]);
const isNav = ref('ongoing');
const changeNav = async (nav: string) => {
    isNav.value = nav;
    await getEvents();
}

const getEvents = async () => {
    const response = await $fetch(`/api/event`,
    {
        method: 'POST',
        body:{
            category: route.params.category,
            token: useCookie('token').value
        }
    });

    if(response.status == 'success')
    {
        if(isNav.value == 'upcoming')
        {
            eventData.value = response.data.filter((e: any) => e.status == 'upcoming');
        }else if(isNav.value == 'ongoing')
        {
            eventData.value = response.data.filter((e: any) => e.status == 'ongoing');
        }else if(isNav.value == 'finished')
        {
            eventData.value = response.data.filter((e: any) => e.status == 'finished');
        }else{
            eventData.value = response.data;
        }

    }else{
        eventData.value = [];
    }
    
}
onMounted(async () => {
    await getEvents();
})


</script>