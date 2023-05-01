<script setup>
import { RouterLink } from 'vue-router'
import {ref} from 'vue'

let emit = defineEmits(["modal-clicked"])
let modalClick =  ref(false)
let menuIsOpen = ref(false)
let openedIcon = "fa-solid fa-bars fa-2x"
let closedIcon = "fa-solid fa-xmark fa-2x"




function handleMenu(){
    menuIsOpen.value = !menuIsOpen.value
}

function handleModalClick(){
    modalClick.value = !modalClick.value

}

emit("modal-clicked", modalClick)

</script>

<template>
    <header>
        <div class="container flex space-between align-center">
            <div class="flex align-center">
               <!-- <img class="logo-icon" src="../assets/images/ic_mobile_navigarion_home_active@3x.png" alt=""> -->
                 <i class="fa-solid fa-map-location-dot fa-2x"></i>
                <span class="logo-name">Nest<span class="accent-logo">Quest</span> </span>
            </div>

            <div class="slide-in-navigation" v-show="menuIsOpen">
                <ul>
                    <li><RouterLink class="router-link text-muted"  active-class="active" to="/">Houses</RouterLink></li>
                    <li><RouterLink class="router-link text-muted" active-class="active" to="/MyProperties">My Properties</RouterLink></li>
                    <li><button  v-on:click="handleModalClick" class="nav-create-new-btn"> <img class="plus-icon" src="../assets/images/house-icon.png" alt="">Create New</button></li>
                </ul>
            </div>

            <nav class="desktop-navigation">
                <ul>
                    <li><RouterLink class="router-link text-muted" active-class="active" to="/">Houses </RouterLink></li>
                    <li><RouterLink class="router-link text-muted" active-class="active" to="/MyProperties">My Properties</RouterLink></li>
                    <li><button v-on:click="handleModalClick" class="nav-create-new-btn"> <img class="plus-icon" src="../assets/images/house-icon.png" alt="">Create New</button></li>
                </ul>
            </nav>

            <div class="mobile-navigation">
                <!-- <img class="info-icon" src="../assets/images/ic_mobile_navigarion_info_active@3x.png" alt=""> -->
                <i v-on:click="handleMenu" :class="[menuIsOpen ? closedIcon : openedIcon]"></i>
            </div>
        </div>
    </header>
</template>

<style scoped>

.router-link{
    text-decoration: none;
    font-weight: 400;
    font-size: 20px;
    transition: color 0.4s ease;
}

.active{
    font-weight: 900;
    /* font-size: 25px; */
    color: var(--primary-color);
}

header {
    position: sticky;
    padding: 15px 0;
    /* width: 100%; */
    top: 0;
    z-index: 20;
    background-color: white;
}

ul {
  padding: 0;
  margin: 0;
 
}

li {
    list-style: none;
    /* text-transform: uppercase; */
    font-weight: 800;
    margin: 10px 0;
}

.container {
    position: relative;
}

i {
   
    cursor: pointer;

    
}



.logo-name {
    font-size: 30px;
}


.fa-map-location-dot{
    color: var(--primary-color);

}

.desktop-navigation ul {
    gap: 60px;
    display: flex;
    align-items: center;
    display: none;
}

.nav-create-new-btn {
    background-color: var(--primary-color);
    border: none;
    padding: 6px 10px;
    border-radius: 7px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.nav-create-new-btn:hover{
    background-color: rgba(235, 84, 64, 0.8);
}



.plus-icon {
    width: 30px;
    height: 25px;
}

.mobile-navigation{
    display: block;
}

.slide-in-navigation {
    position: absolute;
    bottom:-126px;
    background-color: var(--tertiary-color);
    width: 100%;
    transform: translateY(-100%);
    animation: slide-in 0.3s ease forwards;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (min-width: 700px) {
    .desktop-navigation ul {
        display: flex;
    }

    .mobile-navigation {
    display: none;
   }
}


@keyframes slide-in {
    100%{
        opacity: 1;
        transform: translateY(0);
    }

}

</style>