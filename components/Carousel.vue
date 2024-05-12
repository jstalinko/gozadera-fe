<template>
    <div>
                   <!-- page content start -->
                    <div class="mt-2 mb-4 container container-fluid">
                        <h4 class="text-white">Whats new</h4>
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
  <div class="carousel-inner">
    
    <div v-for="(ban,index) in banners" :key="index" :class="index == 0 ? 'carousel-item active' : 'carousel-item'">
      <p>
        {{ imageUrl + ban.description }}
      </p>
      <img class="img-thumbnail-gozadera  shadow-gozadera" :src="imageUrl + ban.image" :alt="ban.description">
    </div>

 
  </div>
  <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
                    </div>
    </div>
</template>

<script setup lang="ts">
const {banners} = defineProps(['banners']);

const config = useRuntimeConfig();
const imageUrl = config.public.apiUrl.replace('/api','/storage/');


</script>