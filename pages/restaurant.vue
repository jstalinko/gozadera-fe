<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" /> 
        
        <Header />
            <div class="container mt-5">
                <h3 class="text-white mb-2" >Menu</h3>
                <ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a :class="(categoryActive == 'food' || categoryActive =='') ?  'nav-link active' : 'nav-link'"   href="#" role="button" @click="getProduct('food')">Food</a>
  </li>
  <li class="nav-item">
    <a :class="(categoryActive == 'beverages') ?  'nav-link active' : 'nav-link'" href="#" role="button" @click="getProduct('beverages')">Beverages</a>
  </li>
  <li class="nav-item">
    <a :class="(categoryActive == 'alcohol' ) ?  'nav-link active' : 'nav-link'" href="#" role="button" @click="getProduct('alcohol')">Liquor</a>
  </li>
  
</ul>

<div class="mt-5 container-fluid">
    <div class="row mt-4">
                <div class="col-6 col-md-4 col-lg-3" v-for="product in products">
                    <div class="card border-0 mb-4 overflow-hidden bg-dark text-white">
                        <img :src="product.image" :alt="product.name" class="card-img-top">
                        <div class="card-body ">
                            
                            <a href="product.html">
                                <p class="mb-0 text-white">{{ product.name }}</p>
                            </a>
                            <h5 class="mb-0 mt-1">
                                <span class="badge badge-light rounded-pill p-2">Rp. {{ idrFormat(product.price) }}</span> 
                            </h5>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <button class="btn btn-block bg-gozadera rounded" @click="addToCart(product.id , product,'add')" v-show="!isProductInCart(product.id)">
                            <i class="material-icons">shopping_cart</i>
                            </button>

                            <div class="input-group justify-content-end"  v-show="isProductInCart(product.id)">
                <div class="input-group-prepend">
                    <button class="btn btn-sm bg-gozadera" type="button" id="button-addon1" @click="addToCart(product.id,product,'remove')">-</button>
                </div>
                <input type="number" class="form-control"  placeholder="Qty" aria-label="Qty" aria-describedby="button-addon"  :value="isProductQty(product.id)" readonly>
                <div class="input-group-append">
                    <button class="btn btn-sm bg-gozadera" type="button" id="button-addon" @click="addToCart(product.id,product,'add')">+</button>
                </div>
            </div>
                        </div>

                    </div>
                </div>

            </div>

</div>
            </div>

            
                <a href="#" data-toggle="modal" data-target="#exampleModalCenter" role="button"  class="btn btn-block bg-gozadera rounded mt-5">
                    <span class="badge badge-light rounded-pill p-2 ">{{ totalQty }}</span>
                    <i class="material-icons">shopping_cart</i> View Cart
                </a>
            
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lg modal-dialog-centered a" role="document">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h5 class="modal-title text-gozadera" id="exampleModalCenterTitle">
                        <i class="material-icons">shopping_cart</i> Cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between bg-transparent text-white" style="border:0px;border-radius:0px;border-bottom:1px solid grey;" v-for="product in carts">
                        
                            <b class="align-self-start">
                                x{{ product?.qty }} -  {{ product?.name }}
                            </b>
                            
                               
                            
                            <b class="align-self-center ">
                                @{{ numberSimple(product?.price) }}
                            </b>
                            <b class="align-self-end">
                                {{ numberSimple(product?.price * product?.qty) }}
                            </b>
                        
                        </li>

                    </ul>
                    <p class="mt-3 mb-2 text-white">Total : <b>Rp. {{ idrFormat(carts.reduce((acc, item) => acc + (item.price * item.qty), 0)) }}</b></p>
                </div>
                <div class="modal-footer">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Outlet</label>
                        <select class="custom-select" id="inputGroupSelect01" @change="getTableOutlet" v-model="outletId" >
                            <option selected>Choose Outlet</option>
                            <option v-for="out in outletz" :value="out.id">{{ out.name }}</option>
                            
                            </select>
                            
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect02">Table Number</label>
                        
                        <select class="custom-select" id="inputGroupSelect02" v-model="tableId">
                            <option selected>Table Number</option>
                            <option v-for="tab in tablez" :value="tab.id" >
                            {{ numberify(tab.floor) }} Floor - Table No :  {{  tab.code }} 
                            </option>
                           
                        </select>
                    </div>

                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" @click="prepareOrder" class="btn btn-default">Order</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">


const config = useRuntimeConfig();
const isLoading = ref(false);
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const carts = useCart();


const categoryActive = ref('');
const products = ref([]);
const outletz = ref([]);
const tablez = ref([]);
const outletId = ref(0);
const tableId = ref(0);


const prepareOrder = async() => {
    const response = await $fetch('/api/order-product', {
        method: 'POST',
        body: {
            token: useCookie('token').value,
            outlet_id: outletId.value,
            table_id: tableId.value,
            member_id: useUser().value.id,
            items: carts.value
        }
    });

    if(response.status == 'success')
    {
        carts.value = [];
        outletId.value = 0;
        tableId.value = 0;
        const router = useRouter();
        router.push('/thanks?ref=restaurant');
    }else{
         alert('Failed to order');
         window.location.reload();
    }
}

const addToCart = (id , product,action) => {
    let item = carts.value.find(product => product?.id == id)

if (!item) {
    carts.value.push({
        id: id,
        name: product.name,
        price: product.price,
        qty: 1
    });

} else {
    if (action == 'add') {
        item.qty++;
    } else {
        item.qty--;
    }
    

}
}
const isProductInCart = (id) => {
    return carts.value.some(product => product.id == id);
}
const isProductQty = (id) => {
    return isProductInCart(id) ?  carts.value.find(product => product.id == id)?.qty : 0;
}
const totalQty = computed(() => {
    return carts.value.reduce((acc, item) => acc + item.qty, 0);
});

const getProduct = async (type: string) => {

    const prod = await $fetch(`/api/product/${type}`)
    console.log(prod)
    categoryActive.value = type;
    products.value = prod?.data;
}
const getOutlets = async () => {
    isLoading.value = true;
    const outlets = await $fetch('/api/outlets', {
        method: 'POST',
        body: {
            token: useCookie('token').value
        }
    });
    if(outlets.status == 'error') {
        console.log(outlets);
        return;
    }else{
        outletz.value = outlets.data;
    }
    isLoading.value = false;
}

const getTableOutlet = async () => {
    isLoading.value = true;
    const id = outletId.value;
    const tables = await $fetch('/api/outlet/tables-only', {
        method: 'POST',
        body: {
            token: useCookie('token').value,
            outlet_id: id
        }
    });
    if(tables.status == 'error') {
        console.log(tables);
        return;
    }else{
        tablez.value = tables.data;
    }
    isLoading.value = false;
}

const numberSimple = (num: number) => {
    // simpletify to K
    if (num > 1000) {
        var total = num / 1000;
        // change . to ,
        return total.toFixed(2).toString().replace(".", ",") + " K";
    }
}

onMounted(async () => {
    isLoading.value = true;
    await getProduct('food');
    await getOutlets();
    isLoading.value = false;
});


</script>