


<template>
    <div>
      <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />
        <!-- Begin page content -->
        <main class="flex-shrink-0 main has-footer pt-2">
          <div class="container h-100">
              <!-- Swiper intro -->
              <div class="swiper-container introduction text-white">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide overflow-hidden text-center">
                          <div class="row no-gutters h-100">
                              <div class="col align-self-center px-3">
                                  <img src="/img/banteng_gold_no_bg.png" alt="" class="mw-100 my-5">
                                  <div class="row">
                                      <div class="container mb-5">
                                          <h4>Amazing Night club</h4>
                                          
                                          <p>After a day of exploring the island, there’s nothing better to do than let loose and party the night away.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="swiper-slide overflow-hidden text-center">
                          <div class="row no-gutters h-100">
                              <div class="col align-self-center px-3">
                                  <img src="#" alt="" class="mw-100 my-5">
                                  <div class="row">
                                      <div class="container mb-5">
                                          <h4>Best club ever</h4>
                                          <p>Sip on fruity drinks by the ocean at one of the laid-back beach clubs, get your booze at a hot nightclub, or get a whole new clubbing experience at a themed bar. At the Island of the Gods, there’s something for everyone.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="swiper-slide overflow-hidden text-center">
                          <div class="row no-gutters h-100">
                              <div class="col align-self-center px-3">
                                  <img src="#" alt="" class="mw-100 my-5">
                                  <div class="row">
                                      <div class="container mb-5">
                                          <h4>World Class club</h4>
                                          <p>Get some tacos to go along with margaritas at the funky and colorful Motel Mexicola. During the day.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- Add Pagination -->
                  <div class="swiper-pagination"></div>
              </div>
              <!-- Swiper intro ends -->
          </div>
      </main>
  
      <!-- footer -->
      <div class="footer no-bg-shadow py-3">
          <div class="row justify-content-center">
              <div class="col">
                  <a href="/login" class="btn btn-default rounded btn-block">Login</a>
              </div>
              <div class="col">
                  <a href="/register" class="btn btn-outline-default rounded btn-block">Register</a>
              </div>
          </div>
      </div>
   
    </div>
  </template>
  

  <script lang="ts" setup>
  
  
  const config = useRuntimeConfig();
  definePageMeta({
      title: 'Home',
      meta: [
          {
              name: 'description',
              content: 'Home page'
          }
      ],
      middleware: 'guest'
  });
  
  const appName = ref(config.public.appName);
  const appDescription = ref(config.public.appDescription);
  const isLoading = ref(true);
setTimeout(() => {
    isLoading.value = false;
}, 100)
  
  </script>