<template>
    <div>
            <!-- footer-->
            <div class="footer">
            <div class="row no-gutters justify-content-center">
                <div class="col-auto">
                    <NuxtLink href="/dashboard" :class="(activeMenu == 'dashboard') ? 'active' : ''">
                        <i class="material-icons">home</i>
                        <p>Home</p>
                    </NuxtLink>
                </div>
                <div class="col-auto">
                    <NuxtLink href="/restaurant" :class="(activeMenu == 'restaurant') ? 'active' : ''">
                        <i class="material-icons">restaurant</i>
                        <p>F & B</p>
                    </NuxtLink>
                </div>
                <div class="col-auto">
                    <a href="/scanqr" :class="(activeMenu == 'scanqr') ? 'active' : ''">
                        <i class="material-icons">qr_code_scanner</i>
                        <p>Scan QR</p>
                    </a>
                </div>
                <div class="col-auto">
                    <NuxtLink href="/redeem" :class="(activeMenu == 'redeem') ? 'active' : ''">
                        <i class="material-icons">monetization_on</i>
                        <p>Redeem</p>
                    </NuxtLink>
                </div>
                <div class="col-auto">
                    <NuxtLink href="/profile" :class="(activeMenu == 'profile') ? 'active' : ''">
                        <i class="material-icons">account_circle</i>
                        <p>Profile</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const {activeMenu} = defineProps(['activeMenu']);
</script>