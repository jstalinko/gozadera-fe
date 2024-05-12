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
                        <a href="/register" class="text-white">
                            Sign up
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
                                <h2 class="font-weight-normal mb-5">Login into<br>your account</h2>
                                <div class="alert alert-danger" v-if="isLogin == 'error'">
                                    <strong>Error !</strong> {{ errorMsg }}
                                </div>
                                <div class="alert alert-success" v-if="isLogin == 'success'">
                                    <strong>Success!</strong> You have successfully logged in
                                </div>
                                <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="user.email">
                                    <label class="form-control-label text-white">Username/Email</label>
                                </div>
                                <div class="form-group float-label position-relative">
                                    <input type="password" class="form-control text-white" v-model="user.password">
                                    <label class="form-control-label text-white">Password</label>
                                </div>
                                <p class="text-left"><a href="/forgot-password" class="text-white">Forgot Password?</a>
                                </p>
                                <p class="text-left"><a href="/register" class="text-white">Don't have an account?</a>
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
                    <button class="btn btn-default rounded btn-block" @click="login" type="button">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

definePageMeta({
    title: 'Login',
    meta: [
        {
            name: 'description',
            content: 'Login page'
        }
    ],
    middleware: 'guest'
});
const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(false);

const user = reactive({
    email: '',
    password: ''
});

const isLogin = ref('');
const errorMsg = ref('');

const login = async () => {

    try{
        isLoading.value = true;

    const body = await $fetch('/api/login' , {
        method: 'POST',
        body: user
    });
    if(body.status == 'success'){
        
        const status = body.member.status;
        if(status == 'active')
        {
            const token = useCookie('token');
            const users = useCookie('user');
            users.value = JSON.stringify({
                id: body.member.id,
                name: body.member.username,
                email: body.member.email,
                status: body.member.status,
                image: body.member.image,
                point: body.member.point,
                phone: body.member.phone,
            });
            token.value = body.token;
            isLogin.value = 'success';
             setTimeout(() => {
            return navigateTo('/dashboard');
        }, 1000);

        }else if(status == 'inactive')
        {
            isLogin.value = 'error';
            errorMsg.value = 'Your account is not active';

        }else if(status == 'banned')
        {
            isLogin.value = 'error';
            errorMsg.value = 'Sorry, your account is banned. please contact admin';
        }
       
        
        isLoading.value = false;
    }else{
        isLogin.value = 'error';
        isLoading.value = false;
        errorMsg.value ='Email or password is incorrect';
    }
}catch(e){
    
    isLoading.value = false;
    isLogin.value = 'error';
    errorMsg.value = 'Email or password is incorrect';
}


}

</script>