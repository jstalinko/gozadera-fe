<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />

        

        <div class="container container-fluid mb-4">
            <h3 class="text-white border text-center mt-3 mb-4 rounded-pill"> ALL EVENTS </h3>

            <ul class="nav nav-pills nav-fill">
                <li class="nav-item" >
                    <a :class="(isNav == 'upcoming') ? 'nav-link active' : 'nav-link'" role="button" @click="changeNav('upcoming')">Up Coming</a>
                </li>
                <li class="nav-item" >
                    <a :class="(isNav == 'ongoing') ? 'nav-link active' : 'nav-link'" role="button" @click="changeNav('ongoing')">On Going</a>
                </li>

            </ul>


            <div v-if="eventData.length < 1" class="alert alert-warning mt-5" role="alert">
                No Events found
            </div>
          
            <div class="row mt-2 mb-5">
                <div class="col-12 m-2" v-for="p in eventData">

                    <div class="card bg-dark text-white shadow" >
                        <img :src="imageUrl(p.image)" class="card-img-top" :alt="p.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ p.name }}
                                <span class="badge badge-success p-2 rounded-pill float-right">{{ p.type.toUpperCase() }}</span>
                                </h5>
                            <p class="card-text">
                                <span> <i class="material-icons">calendar_today</i> {{ humanifyDate(p.start_date) }} - {{ humanifyDate(p.end_date) }}</span>
                            </p>
                            <p class="card-text">
                                {{ p.description }}
                            </p>
                            <NuxtLink :to="'/rsvp/'+p.outlet_id+'?startDate='+p.start_date+'&endDate='+p.end_date" class="btn btn-default btn-block" v-show="p.status !== 'finished'">
                                <i class="material-icons">calendar_month</i> RSVP 
                            </NuxtLink>
                            <a href="#" class="btn btn-danger btn-block" v-show="p.status == 'finished'">
                                <i class="material-icons">image</i> Gallery
                            </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <br><br>
        <FooterMenu activeMenu="''" />
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
            category: null,
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