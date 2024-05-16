<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />

        <Header />
        <div class="container mt-5">
            <h3 class="text-white mb-2">Redeem Point</h3><br>
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                    <a :class="(tabActive == 'product') ? 'nav-link active' : 'nav-link'" href="#"
                        @click="tabActive = 'product'" role="button">Product Redeemable</a>
                </li>
                <li class="nav-item">
                    <a :class="(tabActive == 'history') ? 'nav-link active' : 'nav-link'" href="#"
                        @click="tabActive = 'history'" role="button">History Redeem</a>
                </li>

            </ul>
            <div class="alert alert-success mt-4" v-show="isRedeem">
                {{ message }}
            </div>
            <div class="row mt-4" v-show="tabActive == 'product'">
                <div class="col-6 col-md-4 col-lg-3" v-for="re in redeemables" v-show="re.stock > 0">
                    <div class="card border-0 mb-4 overflow-hidden bg-dark text-white">
                        <img :src="re.product.image" class="card-img-top">

                        <div class="card-body ">


                            <p class="mb-0 text-white">{{ re.product.name }}</p>

                            <h5 class="mb-0 mt-1">
                                <span class="badge badge-light rounded-pill p-2">{{ re.point }} Points</span>
                            </h5>
                        </div>
                        <div class="card-footer bg-transparent border-0" v-show="userPoint > re.point">
                            <button class="btn btn-block btn-default rounded" @click="redeem(re.id , re.product_id)">Redeem</button>
                        </div>
                        <div class="card-footer bg-transparent border-0" v-show="userPoint < re.point">
                            <button class="btn btn-block btn-danger rounded" disabled>Redeem</button>
                        </div>

                    </div>
                </div>

            </div>

            <div class="table-responsive mt-4" v-show="tabActive == 'history'">
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Point</th>
                            <th>Status</th>
                            <th>Redeem Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ree in redeemHistories">
                            <td>{{ ree.product.name }}</td>
                            <td>-{{ ree.redeem_point.point }}</td>
                            <td>
                                <span class="badge badge-success p-2" v-if="ree.status == 'approved'">Approved</span>
                                <span class="badge badge-danger p-2" v-if="ree.status == 'rejected'">Rejected</span>
                                <span class="badge badge-warning p-2" v-if="ree.status == 'pending'">Pending</span>
                            </td>
                            <td>{{ new Date(ree.created_at).toLocaleString() }}</td>
                        </tr>
                       
                    </tbody>
                </table>


            </div>

        </div>
<br><br><br>

        <FooterMenu :activeMenu="'redeem'" />
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
const redeemHistories = ref([]);
const user = useUser();
const userPoint = ref(user.value.point);
const isRedeem = ref(false);
const message = ref('');
const redeem = async (id: int , product_id: int) => {
    isLoading.value = true;
    const token = useCookie('token').value;
    const body = await $fetch('/api/redeem', {
        method: 'POST',
        body: {
            token: token,
            redeem_id: id,
            product_id: product_id
        }
    });
    if (body.status == 'success') {
        await fetchRedeemables();
        await redeemHistory();
        userPoint.value = body.userpoint;
        const userCookie = useCookie('user');
        userCookie.value.point = body.userpoint;
        isRedeem.value = true;
        message.value = 'Successfully redeem product';
        tabActive.value = 'history';
        setTimeout(() => {
            isRedeem.value = false;
        }, 3000);
    }
    console.log(body)
    isLoading.value = false;
}
const fetchRedeemables = async () => {
    isLoading.value = true;
    const token = useCookie('token').value;
    const body = await $fetch('/api/product/redeemables', {
        method: 'POST',
        body: {
            token: token
        }
    });

    redeemables.value = body.data;
    isLoading.value = false;
    console.log(body);

};

const redeemHistory = async () => {
    isLoading.value = true;
    const token = useCookie('token').value;
    const body = await $fetch('/api/redeem-history', {
        method: 'POST',
        body: {
            token: token
        }
    });
    if (body.status == 'success') {
        redeemHistories.value = body.data;

    } else {
        redeemHistories.value = [];

    }

    isLoading.value = false;
    console.log(body);

};

onMounted(async () => {
    await fetchRedeemables();
    await redeemHistory();
});


setTimeout(() => {
    isLoading.value = false;
}, 1000);


</script>