<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <Header />
        <div class="container container-fluid">
            <h3 class="text-white">
                My tickets
            </h3>
            <div class="alert alert-warning mt-4" v-if="tickets.length < 1">
                No tickets found
            </div>
            <div class="card mb-3" v-for="ticket in tickets">


                <div class="card-body position-relative">
                    <div class="row mb-2">
                        <div class="col">
                            <p class="text-secondary small">
                                {{ new Date(ticket.created_at).toLocaleString() }}
                            </p>
                        </div>
                        <div class="col-auto">
                            <span class="badge badge-success p-2" v-if="ticket.status == 'check_in'">Check In</span>
                            <span class="badge badge-warning p-2" v-if="ticket.status == 'check_out'">Check Out</span>
                            <span class="badge badge-danger p-2" v-if="ticket.status == 'cancelled'">Cancelled</span>
                            <span class="badge badge-danger p-2" v-if="ticket.status == 'expired'">Expired</span>
                            <span class="badge badge-info p-2" v-if="ticket.status == 'issued'">Issued</span>
                            <span class="badge badge-warning p-2" v-if="ticket.status == 'waiting_payment'">Waiting
                                Payment</span>
                        </div>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <div class="p-2">
                            <h6 class="mb-1 text-default">#{{ ticket.invoice }}</h6>
                            <div class="text-black">
                               RSVP DATE : {{ ticket.rsvp_date }}
                            </div>
                        </div>
                            <ul>
                                <li v-for="outlet in JSON.parse(ticket.outlet_tables)">
                                    {{ outlet.floor }} Floor | Table No : {{ outlet.table }} | Max Pax : {{
                                        outlet.max_pax }} | <b>Rp. {{ idrFormat(outlet.price) }}</b>
                                </li>

                            </ul>

                            <span class="badge badge-pill badge-info p-2">Pax Left {{ ticket.pax_left }}/{{ maxPax }}
                            </span>
                            <br><br>
                            <h6 class="mb-1">Total : Rp. {{ idrFormat(ticket.total) }}</h6><br>
                            <a class="btn btn-outline-default" data-toggle="collapse" :href="'#payment' + ticket.id"
                                role="button" aria-expanded="false" :aria-controls="'payment' + ticket.id"
                                v-show="ticket.payment_status !== 'paid'">Payment</a>
                        </div>

                        <span class="badge badge-pill badge-danger p-2" v-if="ticket.payment_status == 'unpaid'">{{
                            ticket.payment_status }}</span>
                        <span class="badge badge-pill badge-success p-2" v-if="ticket.payment_status == 'paid'">{{
                            ticket.payment_status }}</span>
                        <span class="badge badge-pill badge-warning p-2" v-if="ticket.payment_status == 'cancelled'">{{
                            ticket.payment_status }}</span>
                        <span class="badge badge-pill badge-info p-2" v-if="ticket.payment_status == 'expired'">{{
                            ticket.payment_status }}</span>
                    </div>
                </div>
                <div class="card-footer collapse" :id="'payment' + ticket.id">

                    <hr>
                    <h5>{{ ticket.payment_method.toUpperCase() }}</h5>
                    <li v-for="payment in ticket.payments">

                        <span>{{ payment.bank_name }} - <b>{{ payment.account_number }}</b> A/N {{ payment.account_name }}</span>
                        
                    </li>
                    <hr>
                    <!-- upload bukti transfer -->
                    <div class="form-group">
                        <label for="bukti">Upload Bukti Transfer</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <br>
        <br>
        <br>
        <br>
        <FooterMenu activeMenu="" />
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
}, 300);
const tickets = ref([]);
const tables = ref([]);
const maxPax = ref(0);
const paymentMethods = ref([]);

const getTicket = async () => {
    const body = await $fetch('/api/my-ticket', {
        method: 'POST',
        body: {
            token: useCookie('token').value
        }
    });
    if (body.status == 'success') {
        tickets.value = body.data;
        // maxPage get from tickets.outlet_tables.max_pax
        body.data.forEach((ticket) => {
            const outletTables = JSON.parse(ticket.outlet_tables);
            outletTables.forEach(async (outlet) => {
                maxPax.value += outlet.max_pax;         
            });
        });
        console.log(body);
    } else {
        tickets.value = [];
    }

}


onMounted(async () => {
    await getTicket();
});

</script>