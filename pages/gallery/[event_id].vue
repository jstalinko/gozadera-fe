<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />
        <div class="container container-fluid">
            <h3 class="text-white">Gallery</h3>
            <div class="border rounded-pill text-center text-white mb-5">
                <h5>{{ event.name }}</h5>
            </div>
            <div class="alert alert-warning" v-show="galleries.length < 1">
                No galleries found
            </div>
            <div class="row" v-show="galleries.length > 0">
                <div class="col-6" v-for="gal in galleries">
                    <div class="card">
                        <img :src="imageUrl(gal.image)" class="card-img-top" >
                        <div class="card-body">
                            <p class="card-text">
                                {{ gal.captions }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <FooterMenu activeMenu="''" />

    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const galleries = ref([]);
const route = useRoute();
const event = ref({});
setTimeout(() => {
    isLoading.value = false;
}, 500);
const getGallery = async () => {
    try {
        isLoading.value = true;
        const resp = await $fetch('/api/gallery', {
            method: 'POST',
            body: {
                event_id: route.params.event_id,
                token: useCookie('token').value
            }
        });
        isLoading.value = false;
        if (resp.status == 'success') {
            galleries.value = resp.data;
            event.value = resp.event;
        } else {
            galleries.value = [];
        }
    console.log(resp);

    } catch (e) {

        isLoading.value = false;
        console.log(e);
    }
}
onMounted(async () => {
    await getGallery();
});
</script>