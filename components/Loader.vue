<template>
    <div>
        <div class="container-fluid h-100 loader-display" v-if="isLoading">
        <div class="row h-100">
            <div class="align-self-center col">
                <div class="logo-loading">
                    <div class="icon icon-100 mb-4 rounded-circle">
                        <img src="/img/banteng_gold_no_bg.png" alt="" class="w-100">
                    </div>
                    <h4 class="text-white">
                        {{ appName }}
                    </h4>
                    <p class="text-secondary">
                        {{ appDescription }}
                    </p>
                    <div class="loader-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>

const {appName , appDescription , isLoading} = defineProps(['appName', 'appDescription' , 'isLoading']);



</script>