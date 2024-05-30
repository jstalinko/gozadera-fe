<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />

        <Header />
        
        <div class="container container-fluid">
            <h3 class="text-white">My QR Code</h3>
            <img :src="qrcode" class="img-fluid " alt="Scan QR" style="width:600px;height:600px;max-width:100%;max-height: 100%;margin:0 auto;"/>
            <div class="text-center">
                <p class="text-white">Scan this QRCode to check in at the outlet and get account points</p>
            </div>
        </div>
    </div>
    <FooterMenu :activeMenu="'scanqr'"/>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Redeem',
    meta: [
        {
            name: 'description',
            content: 'Redeem page'
        }
    ],
    middleware: 'auth'
});

const config = useRuntimeConfig();
const appName = ref(config.public.appName);
const appDescription = ref(config.public.appDescription);
const isLoading = ref(true);
const isError = ref(false);
const errorMsg = ref('');
setTimeout(() => {
    isLoading.value = false;
}, 400);

const qrcode = useUser().value.qrcode;

const onDetect = (detectedCodes) => {
    console.log('detected');
    console.log(detectedCodes[0].rawValue)
}
const onReady = () => {
    console.log('ready')
}
const onError = (error) => {
    if (error.name === 'NotAllowedError') {
        isError.value = true;
        errorMsg.value = 'Camera access was not allowed';
    } else if (error.name === 'NotFoundError') {
        isError.value = true;
        errorMsg.value = 'No camera on this device';
    } else if (error.name === 'NotSupportedError') {
        isError.value = true;
        errorMsg.value = 'Your browser does not support the camera';
    } else if (error.name === 'NotReadableError') {
        isError.value = true;
        errorMsg.value = 'Could not read the camera';

    } else if (error.name === 'OverconstrainedError') {
        isError.value = true;
        errorMsg.value = 'Constraints could not be satisfied by avilable devices';
    } else if (error.name === 'StreamApiNotSupportedError') {
        isError.value = true;
        errorMsg.value = 'Your browser does not support the camera';
    }
}
</script>