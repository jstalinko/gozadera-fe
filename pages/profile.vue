<template>
    <div>
      <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
    
 
    <!-- Begin page content -->
    <main class="flex-shrink-0 main has-footer">
        <Header/>

        <!-- page content start -->
        <div class="container-fluid px-0">
            <div class="card overflow-hidden">
                <div class="card-body p-0 h-150">
                    <div class="background">
                        <img :src="user.image" alt="" style="display: none;">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid top-70 text-center mb-4">
            <div class="avatar avatar-140 rounded-circle mx-auto shadow">
                <div class="background">
                    <img :src="imageUrl(user.image)" class="img-fluid" alt="">
                </div>
            </div>
        </div>

        <div class="container mb-4 text-center text-white">
            <h6 class="mb-1">
                {{  user.name }}
            </h6>
            <p>London, UK</p>
            <p class="mb-1">{{user.email}}</p>
            <p>{{user.phone }}</p>
        </div>

        <div class="main-container">
            <div class="container mb-4">
                <div class="row mb-4">
                    <div class="col-6">
                        <button class="btn btn-outline-default px-2 btn-block rounded" @click="navigateTo('/scanqr')"><span class="material-icons mr-1">qr_code_2</span> My QR Code</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-danger px-2 btn-block rounded" @click="logout"><span class="material-icons mr-1">logout</span> 
                            Sign Out
                        </button>
                    </div>
                </div>
                
            </div>

            <div class="container">
                <div class="card">
                    <div class="card-header bg-dark text-white">
                        <h4 class="mb-0">Profile Settings</h4>
                    </div>
                    <div class="card-body bg-dark text-white">
                        <div class="alert alert-success" v-if="isSuccess" v-show="isSuccess">
                            {{ message }}
                            </div>
                        <div class="alert alert-danger" v-if="!isSuccess" v-show="!isSuccess && message !== ''">
                            {{ message }}
                            </div>
                        <form action="#">
                            <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="userModel.username">
                                    <label class="form-control-label text-white">Username</label>
                                </div>
                           <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="userModel.email">
                                    <label class="form-control-label text-white">Email</label>
                                </div>
                                <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="userModel.phone">
                                    <label class="form-control-label text-white">Phone</label>
                                    </div>
                                <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="userModel.address">
                                    <label class="form-control-label text-white">Address</label>
                                </div>

                                <div class="form-group float-label active">
                                    <input type="password" class="form-control text-white" v-model="userModel.currentPassword">
                                    <label class="form-control-label text-white">Current Password</label>
                                </div>
                                <div class="form-group float-label active">
                                    <input type="password" class="form-control text-white" v-model="userModel.newPassword">
                                    <label class="form-control-label text-white">New Password</label>
                                </div>
                                
                            <button type="button" class="btn btn-default btn-block rounded" @click="prepareUpdate">Update Profile</button>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
    </main>

    <FooterMenu :activeMenu="'profile'"/>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    title: 'Profile',
    meta: [
        {
            name: 'description',
            content: 'Profile page'
        }
    ],
    middleware: 'auth'
});

const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const user = member();
const userModel  = ref({
    username: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    currentPassword: '',
    newPassword: ''
});
setTimeout(() => {
    isLoading.value = false;
}, 100);


const message = ref('');
const isSuccess= ref(false);
const prepareUpdate = async () => {
    const response = await $fetch('/api/update-profile' , {
        method: 'POST',
        body: {
            username: userModel.value.username,
            email: userModel.value.email,
            phone: userModel.value.phone,
            address: userModel.value.address ?? 'not set',
            currentPassword: userModel.value.currentPassword,
            newPassword: userModel.value.newPassword,
            token: useCookie('token').value
        }
    });
    if(response.status == 'success')
    {
        isSuccess.value = true;
        message.value = response.message;
        userModel.value.currentPassword = '';
        userModel.value.newPassword = '';
        userModel.value.username = response.data.username;
        userModel.value.email = response.data.email;
        userModel.value.phone = response.data.phone;
        userModel.value.address = response.data.address;
        
    }else if(response.status == 'error')
    {
        isSuccess.value = false;
        message.value = response.message;
    }else{
        isSuccess.value = false;
        message.value = 'Something went wrong';
    }
}
const getProfile = async () => {
    const response = await $fetch('/api/profile' , {
        method: 'POST',
        body: {
            token: useCookie('token').value
        }
    });
    if(response.status == 'success')
    {
        user.name = response.data.username;
        user.email = response.data.email;
        user.phone = response.data.phone;
        user.address = response.data.address;
    }
}
onMounted(async () => {
    await getProfile();
});


</script>