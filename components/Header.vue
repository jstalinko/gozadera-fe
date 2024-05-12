<template>
<div class="mb-5">
 <header class="header">
            <div class="row">
                <div class="col-auto px-0">
                    <button class="menu-btn btn btn-40 btn-link back-btn" type="button" @click="$router.back()">
                        <span class="material-icons">keyboard_arrow_left</span>
                    </button>
                    <span class="text-white" @click="$router.back()">Back</span>
                </div>
               

                
                
                <div class="ml-auto col-auto">
                    <NuxtLink to="/dashboard" class="avatar avatar-30 shadow-sm rounded-circle ml-2">
                        <figure class="m-0 background">
                            <img src="/img/banteng_gold_no_bg.png" alt="avatar" class="rounded-circle">
                        </figure>
                    </NuxtLink>
                </div>
            </div>
        </header>
        <br>
    </div>
</template>


