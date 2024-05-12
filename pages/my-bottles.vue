<template>
    <div>
        <Loader :appName="appName" :appDescription="appDescription" :isLoading="isLoading" />  
        <Header/>
        <div class="container container-fluid">
            <h3 class="text-white">
                My Saved Bottles
            </h3>
            <div class="table-responsive mt-3">
                            <table class="table text-white border ">
                                <thead class="bg-gozadera">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Outlet</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Gozadera Sby</td>
                                        <td>
                                            (x2) Wine 
                                        </td>
                                        <td>
                                            <span class="badge bg-success">Saved</span>
                                        </td>
                                        <td>
                                            Bottle saved for 2 weeks
                                        </td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
        </div>


        <FooterMenu :activeMenu="''"/>
    </div>
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
</script>