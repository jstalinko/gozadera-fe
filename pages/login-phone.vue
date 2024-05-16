<template>
    <div>
      <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
          <!-- Begin page content -->
    <main class="flex-shrink-0 main has-footer">
        <!-- Fixed navbar -->
        <header class="header">
            <div class="row">
                <div class="col-auto px-0">
                    
                    <NuxtLink to="/" class="menu-btn btn btn-40 btn-link back-btn">
                        <span class="material-icons">keyboard_arrow_left</span>
                    </NuxtLink>
                </div>
                <div class="text-left col align-self-center">
                   
                </div>
                <div class="ml-auto col-auto align-self-center">
                    <a href="/login" class="text-white">
                        Sign In With Email
                    </a>
                </div>
            </div>
        </header>
        
        
        <div class="container h-100 text-white">
            <div class="row h-100">
                <div class="col-12 align-self-center mb-4">
                    <div class="row justify-content-center">
                        <img src="/img/banteng_gold_no_bg.png" alt="" class="icon icon-100">
                        <div class="col-11 col-sm-7 col-md-6 col-lg-5 col-xl-4">
                            <h2 class="font-weight-normal mb-3">Login<br> with phone number</h2>
                            <p class="mb-5">Provide your registered whatsapp number to get OTP code.</p>
                            <div class="form-group float-label active">
                                <input type="tel" class="form-control text-white" v-model="phone" >
                                <label class="form-control-label text-white">Phone (*whatsapp number)</label>
                            </div>

                            <div class="form-group float-label" v-show="otpCodeForm">
                                <input type="tel" class="form-control text-white" v-model="otpCode">
                                <label class="form-control-label text-white">OTP Code</label>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="footer no-bg-shadow py-3">
            <div class="row justify-content-center">
                <div class="col">
                    <button class="btn btn-default rounded btn-block" @click="resetAction" type="button">Continue</button>
                </div>
            </div>
        </div>
    </main>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const phone = ref('');
const otpCode = ref('');
const otpCodeForm = ref(false);
setTimeout(() => {
    isLoading.value = false;
}, 100);

const resetAction = () => {
    if(phone.value == ''){
        alert('Please provide your phone number');
        return;
    }
    alert('Reset password action');
}
</script>