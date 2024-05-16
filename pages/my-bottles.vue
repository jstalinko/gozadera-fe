<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
        <Header/>
        <div class="container container-fluid">
            <h3 class="text-white">
                My Saved Bottles
            </h3>
            <div class="table-responsive mt-3">
                    <div v-if="bottles.length == 0" class="alert alert-warning" role="alert">
                        No bottles found
                    </div>
                    <div v-else>
                            <table class="table text-white border ">
                                <thead class="bg-gozadera">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Outlet</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bottle in bottles">
                                        <th scope="row">1</th>
                                        <td>
                                            {{ bottle.outlet.name }}
                                        </td>
                                        <td>
                                            (x{{ bottle.qty }}) {{ bottle.product.name }} 
                                        </td>
                                        <td>
                                            <div v-if="bottle.status == 'saved'">
                                                <span class="badge bg-success">
                                                    {{ bottle.status }}
                                                </span>
                                            </div>
                                            <div v-else>
                                                <span class="badge bg-primary">
                                                    {{ bottle.status }}
                                                </span>
                                                </div>
                                            
                                        </td>
                                        <td>
                                            {{ bottle.note }}
                                        </td>
                                    </tr>
                                   
                                </tbody>
                            </table>
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
const bottles = ref([]);
setTimeout(() => {
    isLoading.value = false;
}, 200);

const myBottles = async () => {
    isLoading.value = true;
    const body = await $fetch(`/api/my-bottles`,
    {
        method: 'POST',
        body:{
            token: useCookie('token').value,
            memberId: useUser().value.id
        }
    
    });

    if(body.status == 'success' ){
        bottles.value = body.data;
    }else{
        bottles.value = [];
    }
    isLoading.value = false;

    console.log(body.data);
};
onMounted(async () => {
   await myBottles();
});
</script>