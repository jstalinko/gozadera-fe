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
                        <button class="btn btn-outline-default px-2 btn-block rounded"><span class="material-icons mr-1">qr_code_scanner</span> Share QR</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-danger px-2 btn-block rounded"><span class="material-icons mr-1">logout</span> 
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
                        <form action="#">
                            <div class="form-group float-label active">
                                    <input type="text" class="form-control text-white" v-model="userModel.name">
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
                                
                            <button type="submit" class="btn btn-default btn-block rounded">Update Profile</button>
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
const userModel  = ref(user);
setTimeout(() => {
    isLoading.value = false;
}, 100);
</script>