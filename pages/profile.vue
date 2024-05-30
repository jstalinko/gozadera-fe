<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />


        <!-- Begin page content -->
        <main class="flex-shrink-0 main has-footer">
            <Header />

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
                   
                        <img :src="imageUrl(user.image)" class="img-fluid" alt="">
                   
                </div>
            </div>

            <div class="container mb-4 text-center text-white">
                <h6 class="mb-1">
                    {{ user.name }}
                </h6>

                <p class="mb-1">{{ user.email }}</p>
                <p>{{ user.phone }}</p>
            </div>

            <div class="main-container">
                <div class="container mb-4">
                    <div class="row mb-4">
                        <div class="col-6">
                            <button class="btn btn-outline-default px-2 btn-block rounded" data-toggle="modal"
                                data-target="#changeProfile"><span class="material-icons mr-1">image</span> Change
                                Photo</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-danger px-2 btn-block rounded" @click="logout"><span
                                    class="material-icons mr-1">logout</span>
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
                                    <input type="password" class="form-control text-white"
                                        v-model="userModel.currentPassword">
                                    <label class="form-control-label text-white">Current Password</label>
                                </div>
                                <div class="form-group float-label active">
                                    <input type="password" class="form-control text-white"
                                        v-model="userModel.newPassword">
                                    <label class="form-control-label text-white">New Password</label>
                                </div>

                                <button type="button" class="btn btn-default btn-block rounded"
                                    @click="prepareUpdate">Update Profile</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </main>

        <FooterMenu :activeMenu="'profile'" />
        <div class="modal fade" id="changeProfile" tabindex="-1" role="dialog" aria-labelledby="changeProfileLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="changeProfileLabel">Change Profile Picture</h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <form action="#">
                            <div class="form-group" v-if="previewImageSrc">
                                <div class="avatar avatar-140 rounded-circle mx-auto shadow">
                                    
                                        <img :src="previewImageSrc" class="img-fluid" id="imagePrev" alt="">
                                    
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="file" name="file" class="form-control" id="profileImage" accept="image/*"
                                    @change="previewImage">
                            
                            </div>
                            <button type="button" @click="uploadImage" class="btn btn-default btn-block rounded">Upload</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useUser } from '#imports';


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
const previewImageSrc = ref('');
const imageFile = ref('');
const userModel = ref({
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
const isSuccess = ref(false);
const prepareUpdate = async () => {
    const response = await $fetch('/api/update-profile', {
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
    if (response.status == 'success') {
        isSuccess.value = true;
        message.value = response.message;
        userModel.value.currentPassword = '';
        userModel.value.newPassword = '';
        userModel.value.username = response.data.username;
        userModel.value.email = response.data.email;
        userModel.value.phone = response.data.phone;
        userModel.value.address = response.data.address;

    } else if (response.status == 'error') {
        isSuccess.value = false;
        message.value = response.message;
    } else {
        isSuccess.value = false;
        message.value = 'Something went wrong';
    }
}
const getProfile = async () => {
    const response = await $fetch('/api/profile', {
        method: 'POST',
        body: {
            token: useCookie('token').value
        }
    });
    console.log(response);
    if (response.status == 'success') {
        user.name = response.data.username;
        user.email = response.data.email;
        user.phone = response.data.phone;
        user.address = response.data.address;
    }
}

const previewImage = (e) => {
    const file = e.target.files[0];
    var imageUrl = URL.createObjectURL(file);
    previewImageSrc.value = imageUrl;
    imageFile.value = file;
};
const uploadImage = async () => {
    
    const file = imageFile.value;
    const formData = new FormData();
    formData.append('image', file);
    const token = useCookie('token').value;
    const response = await $fetch(`${config.public.apiUrl}/upload-profile`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`
        },
        body: formData
    });
    if (response.status == 'success') {
        user.image = response.img_url;
        const cookieUser = useCookie('user');
        cookieUser.value = JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            image: response.img_url,
            point: user.point,
            phone: user.phone,
            qrcode: user.qrcode,
            address: user.address
        });      
        await getProfile();
    }
};

onMounted(async () => {
    await getProfile();
});


</script>