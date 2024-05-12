<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
        <Header/>
        <div class="container mt-5 ">
            <h3 class="text-white">
                Outlets
            </h3>
            <b class="mb-4">
                <p class="text-white">
                    Find the nearest outlet to you

                </p>
            </b>
            <div class="card mb-4 mt-2 oveflow-hidden" v-for="out in outletz" :key="out.id">
                    <div class="card-header">
                        <h6 class="subtitle mb-0">
                            {{out.name}}<br>
                            <small>
                                {{ out.tagline }}
                            </small>
                        </h6>
                    </div>
                    <div class="d-block h-150">
                        <iframe :src="out.gmaps_url" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    <div class="card-body">
                        Address: 
                        <address><i>
                            {{ out.address }}
                        </i>
                        </address>
                        <p>Phone : {{ out.phone }}</p>
                        
                    </div>
                    <div class="card-footer d-flex-row" >
                       
                        <span :class="(out.is_karoke == 1) ? 'badge badge-success m-2' : 'badge badge-secondary m-2'">
                            <i class="material-icons">lyrics</i> 
                            Karoke <span v-if="out.is_karoke == 1">Available</span> <span v-else>Not Available</span>
                        </span>
                        <span :class="(out.is_bar == 1) ? 'badge badge-success m-2' : 'badge badge-secondary m-2'">
                            <i class="material-icons">local_bar</i> 
                            Bar <span v-if="out.is_bar == 1">Available</span> <span v-else>Not Available</span>
                        </span>
                        <span :class="(out.private_room == 1) ? 'badge badge-success m-2' : 'badge badge-secondary m-2'">
                            <i class="material-icons">meeting_room</i> 
                            Private Room <span v-if="out.private_room == 1">Available</span> <span v-else>Not Available</span>
                        </span>

                        <NuxtLink class="btn btn-default float-right" :to="'/rsvp/'+out.id">
                            <i class="material-icons">calendar_month</i> RSVP</NuxtLink>
                    </div>
                </div>
        </div>

        <FooterMenu :activeMenu="''"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Redeem',
    meta: [
        {
            name: 'description',
            content: 'Redeem page'
        }
    ],
    middleware: 'auth'
});

const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const outletz = ref([]);

const OutLets = async() => {
    let tokenValue = useCookie('token');
    try {
        const response = await $fetch('/api/outlets' , {
            method:'POST',
            body:{
                token: tokenValue.value 
            }
        });
        if(response.status == 'success'){
            
            outletz.value = response.data;
            console.log(response);
        }else{
            console.log(response);
        }
        
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        isLoading.value = false;
    }
}

onMounted(async () => {
    await OutLets();
});

</script>