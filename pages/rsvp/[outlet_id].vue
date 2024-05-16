<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />

        <div class="container container-fluid mt-3">
            <div class="card rounded bg-dark text-gozadera">
                <img :src="imageUrl(outletDetail.image)" class="card-img-top" style="max-height: 200px" />
                <div class="card-body">
                    <h5 class="card-title">
                        {{ outletDetail.name }}
                    </h5>
                    <p class="card-text">
                        {{ outletDetail.tagline }}
                    </p>
                    <address>
                        <i>
                            {{ outletDetail.address }}
                        </i>
                    </address>
                    <p>Phone : {{ outletDetail.phone }}</p>
                </div>
            </div>
            <div class="card rounded mt-3 bg-dark text-white">

                <img :src="imageUrl(outletDetail.area_image)" class="card-img-top" 
                    style="max-height: 200px" alt="area maps image" />
                <div class="card-header">
                    <h6 class="card-title mb-0">Reservation Form</h6>
                </div>
                <div class="card-body">
                    <div class="form-group">
                       <label for="date">Choose Date</label>
                       <vue-date-picker dark v-model="selectDate" :min-date="minDate" :max-date="maxDate"></vue-date-picker>
                    </div>
                    <div class="form-group">
                        <label for="floor">Choose Floor</label>
                        <div class="btn-group-toggle row m-1" data-toggle="buttons">
                            <label class="btn btn-outline-default col-6" v-for="flo in floorOutlet">
                                <input type="radio" name="floor" id="floor" autocomplete="off"
                                    @click="selectFloor(flo.floor)" />
                                <b>{{ numberify(flo.floor) }}</b>
                                <small>&nbsp;Floor</small>
                            </label>
                        </div>
                    </div>
                    <div class="form-group" v-show="outletTables.length > 0">
                        <label for="tableno">Choose Table Number</label>
                        <div class="btn-group-toggle">
                            <label class="btn btn-outline-default" :class="{ active: isTableSelected(table.id) }"
                                :id="'tbl' + table.id" v-for="table in outletTables">
                                <input type="checkbox" :name="table.code"
                                    @click="addToCart(floorActive, table.id, table)" />
                                {{ table.code }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card rounded mt-3 bg-dark text-white" v-show="carts.length > 0">
                <div class="card-header">
                    <h6 class="card-title mb-0">Summary</h6>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between bg-transparent text-white" style="
                border: 0px;
                border-radius: 0px;
                border-bottom: 1px solid grey;
              " v-for="cart in carts">
                            <b class="align-self">
                                {{ numberify(cart.floor) }} <small> Floor</small> -
                                {{ cart.table }} - {{ cart.max_pax }} pax -
                                {{ currencyFormat(cart.price) }}
                            </b>
                        </li>
                    </ul>

                    <p class="mt-3 mb-2">Total : <b>Rp. {{ idrFormat(totalPrice) }} </b></p>
                    <br />
                    <!-- payment method -->
                    <div class="form-group">
                        <label for="payment">Choose Payment Method</label>
                        <select class="form-control bg-dark text-white" v-model="payment_method">
                            <option value="transfer">Bank Transfer</option>
                            <option value="qris">QRIS</option>
                        </select>
                    </div>

                    <button class="btn btn-default btn-block rounded" data-toggle="modal"
                        data-target="#modalConfirmation">
                        <i class="material-icons">send</i> Continue
                    </button>
                </div>
            </div>


        </div>

        <!-- modal confirmation -->
        <div class="modal fade" id="modalConfirmation" tabindex="-1" role="dialog"
            aria-labelledby="modalConfirmationTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-gozadera" id="modalConfirmationTitle">
                            <i class="material-icons">send</i> Confirmation
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body text-white">
                        <h3>
                            Do you want to also order food / drinks?
                        </h3>
                        <p>
                            You can order food / drinks now, or you can order later.<br>
                            If you want to order now, please click "Yes, I want !"<br>

                            If you want to order later, please click "No thanks"
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-default" @click="prepareForRsvp">No thanks</button>
                        <button type="button" class="btn btn-default">Yes , I want !</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- endmodal-->
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const route = useRoute();
const carts = useCart();
const totalPrice = computed(() => {
    return carts.value.reduce((acc, item) => acc + item.price, 0);
});

setTimeout(() => {
    isLoading.value = false;
}, 1000);

const outletDetail = ref([]);
const outletTables = ref([]);
const floorOutlet = ref([]);
const floorActive = ref(0);
const selectDate = ref(new Date());
const minDate = new Date(route.query.startDate);
const maxDate = new Date(route.query.endDate);
const payment_method = ref("transfer");

const addToCart = (floor: number, table: string, data: []) => {
    let item = carts.value.find((item) => item.id == table);
    if (!item) {
        carts.value.push({
            id: data.id,
            floor: floor,
            table: data.code,
            price: data.price,
            max_pax: data.max_pax,
        });
    } else {
        carts.value = carts.value.filter((item) => item.id != table);

    }

    console.log(carts.value);
};

const prepareForRsvp = async () => {
    const token = useCookie("token").value;
    const outlet_id = route.params.outlet_id;
    const id = useUser().value.id;
    const car = useCart();
    const body = await $fetch("/api/add-rsvp", {
        method: "POST",
        body: {
            token: token,
            outlet_id: outlet_id,
            user_id: id,
            rsvp_date: selectDate.value,
            payment_method: payment_method.value,
            data: JSON.stringify(car.value),
        },
    });

    if(body.status == 'success')
    {
        return navigateTo('/thanks?ref=rsvp');
    }else{
        return ;
    }

};
const isTableSelected = (id: string) => {
    return carts.value.find((item) => item.id == id);
};

const selectFloor = async (floor: number) => {
    isLoading.value = true;
    floorActive.value = floor;
    const token = useCookie("token");
    const id = route.params.outlet_id;
    const body = await $fetch("/api/outlet/tables", {
        method: "POST",
        body: {
            token: token.value,
            outlet_id: id,
            floor: floor,
        },
    });

    if (body.status == "error") {
        console.log(body);
        isLoading.value = false;
        return;
    } else {
        outletTables.value = body.data;
        isLoading.value = false;
    }
    console.log(body);
};

const getFloor = async () => {
    isLoading.value = true;
    const token = useCookie("token");
    const id = route.params.outlet_id;
    const body = await $fetch("/api/outlet/floor", {
        method: "POST",
        body: {
            token: token.value,
            outlet_id: id,
        },
    });

    if (body.status == "error") {
        console.log(body);
        isLoading.value = false;
        return;
    } else {
        floorOutlet.value = body.data;
        isLoading.value = false;
        console.log(body);
    }
};

const getOutletDetail = async () => {
    isLoading.value = true;
    const token = useCookie("token");
    const id = route.params.outlet_id;
    const body = await $fetch("/api/outlet/" + id, {
        method: "POST",
        body: {
            token: token.value,
        },
    });

    if (body.status == "error") {
        console.log(body);
        isLoading.value = false;
        return;
    } else {
        outletDetail.value = body.data;
        isLoading.value = false;
    }
};



onMounted(async () => {
    await getFloor();
    await getOutletDetail();
});
</script>
