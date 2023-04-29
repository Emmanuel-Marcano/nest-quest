<script setup>
// Imports
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CreatePropertyModal from './components/CreatePropertyModal.vue';
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue';

let showModal = ref(false)


function handleModalClick(e){
  watch(e, function(){
    console.log(e.value)
    showModal.value = !showModal.value
  })
}


function closeModal(e){
  watch(e, function(){
    console.log(e.value)
    showModal.value = !showModal.value
    
  })


}



</script>

<template>
    <Header @modal-clicked="handleModalClick"/>
    <CreatePropertyModal @close-modal="closeModal" v-show="showModal"/>
    <RouterView/>
    <Footer/>
</template>


<style scoped>


</style>
