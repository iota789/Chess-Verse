<template>
    <div id="mainbody" class="w-dvw h-dvh ">
     <div class="h-full w-full  overflow-auto bg-t-bg-one z-10">
            <TopNavBar></TopNavBar>
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>
<script setup>
import TopNavBar from '~/components/TopNavBar.vue';

</script>