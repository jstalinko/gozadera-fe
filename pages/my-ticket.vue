<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
        <Header/>
        <div class="container container-fluid">
            <h3 class="text-white">
               My tickets
            </h3>

            <div class="card mb-3">
                    <div class="card-body position-relative">
                        <div class="row mb-2">
                            <div class="col">
                                <p class="text-secondary small">4:20pm | 10/1/2021</p>
                            </div>
                            <div class="col-auto">
                                <p class="text-success">Successful</p>
                            </div>
                        </div>
                        <div class="media">                            
                            <div class="media-body">
                                <h6 class="mb-1 text-default">Idea reacharge</h6>
                                <p class="">For 90000 900000</p>
                                <h6 class="mb-1">$ 48.99</h6>
                            </div>
                            <button class="btn btn-default btn-40 rounded-circle"><i class="material-icons">repeat</i></button>                            
                        </div>
                    </div>
                </div>
            
        </div>
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
setTimeout(() => {
    isLoading.value = false;
}, 1000);
</script>