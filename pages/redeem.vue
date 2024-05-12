<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />

        <Header />
        <div class="container mt-5">
            <h3 class="text-white mb-2">Redeem Point</h3><br>
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                    <a :class="(tabActive == 'product') ? 'nav-link active' : 'nav-link'" href="#"
                        role="button">Product Redeemable</a>
                </li>
                <li class="nav-item">
                    <a :class="(tabActive == 'alcohol') ? 'nav-link active' : 'nav-link'" href="#"
                        role="button">History Redeem</a>
                </li>

            </ul>
            <div class="row mt-4">
                <div class="col-6 col-md-4 col-lg-3" v-for="re in redeemables">
                    <div class="card border-0 mb-4 overflow-hidden bg-dark text-white">
                        <div class="card-body h-150 position-relative ">


                            <a href="product.html" class="background">
                                <img src="#" alt="">
                            </a>
                        </div>
                        <div class="card-body ">
                            
                            <a href="product.html">
                                <p class="mb-0 text-white">{{ re.product.name }}</p>
                            </a>
                            <h5 class="mb-0 mt-1">
                                <span class="badge badge-light rounded-pill p-2">{{ re.point }} Points</span> 
                            </h5>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <button class="btn btn-block bg-gozadera rounded">Redeem</button>
                            </div>

                    </div>
                </div>

            </div>

        </div>


        <FooterMenu :activeMenu="'redeem'"/>
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
const tabActive = ref('product');
const isLoading = ref(true);
const redeemables = ref([]);

const fetchRedeemables = async () => {
    isLoading.value = true;
    const token = useCookie('token').value;
    const body = await $fetch('/api/product/redeemables' ,{
        method: 'POST',
        body: {
            token: token
        }
    });
    
    redeemables.value = body.data;
    isLoading.value = false;
    console.log(body)
};
onMounted(async () => {
   await fetchRedeemables();
  
});


setTimeout(() => {
    isLoading.value = false;
}, 1000);


</script>