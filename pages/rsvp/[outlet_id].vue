<template>
  <div>
    <Loader
      :appName="appName"
      :appDescription="appDescription"
      :isLoading="isLoading"
    />
    <Header />

    <div class="container container-fluid mt-3">
      <div class="card rounded bg-dark text-gozadera">
        <img
          :src="imageUrl(outletDetail.image)"
          class="card-img-top"
          :alt="outletDetail.name"
          style="max-height: 200px"
        />
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
        <div class="card-header">
          <h6 class="card-title mb-0">Reservation Form</h6>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label for="floor">Choose Floor</label>
            <div class="btn-group-toggle row m-1" data-toggle="buttons">
              <label
                class="btn btn-outline-default col-6"
                v-for="flo in floorOutlet"
              >
                <input
                  type="radio"
                  name="floor"
                  id="floor"
                  autocomplete="off"
                  @click="selectFloor(flo.floor)"
                />
                <b>{{ numberify(flo.floor) }}</b>
                <small>Floor</small>
              </label>
            </div>
          </div>
          <div class="form-group" v-show="outletTables.length > 0">
            <label for="tableno">Choose Table Number</label>
            <div class="btn-group-toggle">
              <label
                class="btn btn-outline-default"
                :class="{ active: isTableSelected(table.id) }"
                :id="'tbl' + table.id"
                v-for="table in outletTables"
              >
                <input
                  type="checkbox"
                  :name="table.code"
                  @click="addToCart(floorActive, table.id, table)"
                />
                {{ table.code }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        class="card rounded mt-3 bg-dark text-white"
        v-show="carts.length > 0"
      >
        <div class="card-header">
          <h6 class="card-title mb-0">Summary</h6>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between bg-transparent text-white"
              style="
                border: 0px;
                border-radius: 0px;
                border-bottom: 1px solid grey;
              "
              v-for="cart in carts"
            >
              <b class="align-self">
                {{ numberify(cart.floor) }} <small>Floor</small> -
                {{ cart.table }} - {{ cart.max_pax }} pax -
                {{ currencyFormat(cart.price) }}
              </b>
            </li>
          </ul>

          <br />
          <button class="btn btn-default btn-block rounded">
            <i class="material-icons">send</i> Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const route = useRoute();
const carts = useCart();

setTimeout(() => {
  isLoading.value = false;
}, 1000);

const outletDetail = ref([]);
const outletTables = ref([]);
const floorOutlet = ref([]);
const floorActive = ref(0);

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
    document.getElementById("tbl" + table.id).classList.add("active");
  } else {
    carts.value = carts.value.filter((item) => item.id != table);
    document.getElementById("tbl" + table.id).classList.remove("active");
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

const getOutletTables = async () => {
  isLoading.value = true;
  const token = useCookie("token");
  const id = route.params.outlet_id;
  const body = await $fetch("/api/outlet/tables", {
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
    outletTables.value = body.data;
    isLoading.value = false;
  }
  console.log(body);
};

onMounted(async () => {
  await getFloor();
  await getOutletDetail();
});
</script>
