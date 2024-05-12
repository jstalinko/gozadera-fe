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
    <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white" style="border:0px;border-radius:0px;border-bottom:1px solid grey;" v-for="product in products">
            <b>{{ product?.name }} </b><i>{{ numberSimple(product?.price) }}</i>
            <button role="button" @click="addToCart(product?.id , product,'add')" v-show="!isProductInCart(product.id)" class="btn bg-gozadera rounded-circle justify-content-end p-1 float-right">
                <i class="material-icons">add</i>
            </button>
            
            <div class="input-group justify-content-end" style="width:35%;" v-show="isProductInCart(product.id)">
                <div class="input-group-prepend">
                    <button class="btn btn-sm bg-gozadera" type="button" id="button-addon1" @click="addToCart(product.id,product,'remove')">-</button>
                </div>
                <input type="number" class="form-control"  placeholder="Qty" aria-label="Qty" aria-describedby="button-addon"  :value="isProductQty(product.id)" readonly>
                <div class="input-group-append">
                    <button class="btn btn-sm bg-gozadera" type="button" id="button-addon" @click="addToCart(product.id,product,'add')">+</button>
                </div>
            </div>
        </li>
      
     
    </ul>
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
                </div>
                <div class="modal-footer">
                    <!-- table number form -->
                    <div class="input-group mb-3">
                        <select class="custom-select" id="inputGroupSelect02">
                            <option selected>Table Number</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-default">Order</button>
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
onMounted(() => {
    getProduct('food');
});

const numberSimple = (num: number) => {
    // simpletify to K
    if (num > 1000) {
        var total = num / 1000;
        // change . to ,
        return total.toFixed(2).toString().replace(".", ",") + " K";
    }

}
</script>