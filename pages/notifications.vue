<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />
        <div class="main-container">
            <div class="container">
                <div class="alert alert-info" role="alert" v-show="orders.length == 0">
                    <h4 class="alert-heading">No Orders</h4>
                    <p>You don't have any orders yet.</p>
                </div>
                <div class="card bg-dark text-white" v-show="orders.length > 0">
                    <div class="card-body px-0">
                        <div class="list-group list-group-flush ">
                            <div v-for="or in orders">
                                <a class="list-group-item bg-dark text-white" data-toggle="collapse"
                                    :href="'#order' + or.id" role="button" aria-expanded="false"
                                    :aria-controls="'order' + or.id">
                                    <div class="row">
                                        <div class="col-auto align-self-center">
                                            <i class="material-icons text-default text-gozadera">local_mall</i>
                                        </div>
                                        <div class="col pl-0">
                                            <div class="row mb-1">
                                                <div class="col">
                                                    <p class="mb-0">ORDER #{{ or.id }} </p>

                                                </div>
                                                <div class="col-auto pl-0">
                                                    <p class="small text-white">{{ new Date(or.created_at
                                                    ).toLocaleString() }}</p>


                                                </div>

                                            </div>
                                            <div class="row mb-1">
                                                <div class="col">
                                                    <span class="badge badge-pill badge-warning p-2"
                                                        v-show="or.status == 'process'">{{ or.status }}</span>
                                                    <span class="badge badge-pill  badge-success p-2"
                                                        v-show="or.status == 'delivered'">{{ or.status }}</span>
                                                </div>
                                                <div class="col-auto pl-0">
                                                    <p class="small text-white">
                                                        {{ JSON.parse(or.items).length }} items
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <div class="collapse" :id="'order' + or.id">
                                    <div class="card-body">
                                        <li v-for="it in JSON.parse(or.items)">
                                            (x{{ it.qty }}) {{ it.name }} - Rp. {{ idrFormat(it.price) }}
                                        </li>
                                        <span class="badge badge-pill badge-info p-2 mt-2">Total : Rp. {{
                                            idrFormat(or.subtotal) }}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
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
}, 200);

const orders = ref([]);
const getOrder = async () => {
    isLoading.value = true;
    try {
        const res = await $fetch('/api/my-order', {
            method: 'POST',
            body: {
                token: useCookie('token').value
            }
        });
        if (res.status == 'success') {
            orders.value = res.data;
            console.log(res);
        } else {
            orders.value = [];
        }
    } catch (e) {
        console.log(e);
    }
    isLoading.value = false;
}
onMounted(async () => {
    await getOrder();
});

</script>
