<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />

          <!-- Begin page content -->
    <main class="flex-shrink-0 main has-footer">
        <!-- Fixed navbar -->
        <header class="header">
            <div class="row">
                <div class="col-auto px-0">
                    <button class="menu-btn btn btn-40 btn-link back-btn" type="button">
                        <span class="material-icons">keyboard_arrow_left</span>
                    </button>
                </div>
                <div class="text-left col align-self-center">

                </div>
                <div class="ml-auto col-auto align-self-center">
                    <a role="button"  class="text-white" @click="navigateTo('/login')">
                        Sign In
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
                            <h2 class="font-weight-normal mb-5">Create new<br>account with us</h2>
                            <div class="alert alert-danger" v-if="isRegister == 'error'">
                                    <strong>Error !</strong> Register failed, please try again later
                                </div>
                                <div class="alert alert-success" v-if="isRegister == 'success'">
                                    <strong>Success!</strong> You have successfully registered, please check your <b>Whatsapp</b> for account details.
                                </div>

                            <div class="form-group float-label active">
                                <input type="text" class="form-control text-white" v-model="User.username" >
                                <label class="form-control-label text-white">Username</label>
                            </div>
                            <div class="form-group float-label active">
                                <input type="text" class="form-control text-white" v-model="User.email">
                                <label class="form-control-label text-white">Email</label>
                            </div>
                            <div class="form-group float-label active">
                                <input type="text" class="form-control text-white" v-model="User.phone">
                                <label class="form-control-label text-white">Phone (*Whatsapp Number)</label>
                            </div>
                           
                           <p> 
                                By clicking Sign Up, you agree to our <a href="#" class="text-white">Terms of Use</a> and our <a href="#" class="text-white">
                                Privacy Policy
                                </a><br>
                                
                           </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <!-- footer-->
    <div class="footer no-bg-shadow py-3">
        <div class="row justify-content-center">
            <div class="col">
                
                <button class="btn btn-default rounded btn-block" @click="register" type="button">Sign up</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig();
definePageMeta({
    title: 'Home',
    description: 'This is the Home page',

});
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(false);
const isRegister = ref('');
const User = reactive({
    username: '',
    email: '',
    phone: '',
});
const register =async () => {
    try{
        isLoading.value = true;
        const resp = await $fetch('/api/register', {
            method: 'POST',
            body: User
        });
        isLoading.value = false;
        if(resp.status == 'success')
        {
            isRegister.value = 'success';
        }else{
            isRegister.value = 'error';
        }
    }catch(e){

        isLoading.value = false;
        isRegister.value = 'error';
    }
}

</script>
