<template>
<div class="flex flex-row justify-between md:gap-40 px-5 md:px-8 py-2  h-16.5  bg-white sticky top-0 z-100 items-center ">
   <NuxtLink to="/">
    <div class="flex flex-row justify-between items-center">

        <img src="/icons/logo.png" alt="" class="w-16 h-16">
        <h1 class="text-black text-xl text-nowrap cursor-pointer">Chess Verse</h1>
    </div>
    </NuxtLink>
    <div class="flex flex-row gap-12 hidden md:flex items-center">
        <NuxtLink to="/play">

            <a class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/play'}">Play</a>
        </NuxtLink>
        <NuxtLink to="/learn">
            <a class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/learn'}">Learn</a>
        </NuxtLink>
        <NuxtLink to="/puzzles">

            <a  class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/puzzles'}">Puzzles</a>
        </NuxtLink>
        <!-- <a href="" class="text-black text-xl">Profile</a> -->
    </div>
    <div class="block md:hidden">

        <i class="pi pi-bars text-xl text-black" @click="toggle"></i>
    </div>
    <Popover ref="PopoverRef" class="!bg-white !text-black">
    <div class="flex flex-col gap-2 ">
        <NuxtLink to="/play">
        <div class="border-b ">


            <a class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/play'}">Play</a>
        </div>
    </NuxtLink>
    <NuxtLink to="/learn">
        <div class="border-b ">

            <a class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/learn'}">Learn</a>
        </div>
    </NuxtLink>
    <NuxtLink to="/puzzles">
        <div class="border-b ">


            <a  class="text-black text-md cursor-pointer" :class="{'text-blue-500':$route.path=='/puzzles'}">Puzzles</a>
        </div>
    </NuxtLink>
    </div>
    </Popover>
</div>
</template>

<script setup>
const PopoverRef= ref()

const toggle = (event) => {
    PopoverRef.value.toggle(event);
}

</script>
