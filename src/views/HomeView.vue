<script setup>
import {ref, watch, onMounted} from 'vue'
import { usePropertiesStore } from '../stores/PropertyStore';
const {getProperties} = usePropertyFetch()
import gsap from 'gsap'
import usePropertyFetch from '../composables/usePropertyFetch'
import Showcase from '../components/Showcase.vue'
import PropertyCard from '../components/PropertyCard.vue'

const propertyStore = usePropertiesStore()

// Data


// Lifecycle methods
onMounted(async function(){
     await propertyStore.getProperties()
})




//  CSS Transitions

function beforeCardEnters(el){
  el.style.opacity = 0
  el.style.transform = "translateY(-50px)"
  

}

function cardEnters(el){
  gsap.to(el, {
        y: 0,
        opacity:1,
        duration: 1,
    })


}

function afterCardEnters(el){
 



}


</script>


<template>
     <Showcase/>
    <p class="text-center">Available Properties ({{ propertyStore.filteredByUserInput.length }})</p>
    <main>
        <div class="container">
            <div class="properties-container">
              <TransitionGroup appear @before-enter="beforeCardEnters" @enter="cardEnters" @after-enter="afterCardEnters">
              <PropertyCard v-for="property in propertyStore.filteredByUserInput" 
              :key="property.id" 
              :property="property"/>
              </TransitionGroup>
           </div>
        </div>
    </main>

</template>



<style scoped>
main {
  padding-top: 20px;
  padding-bottom: 90px;
}

.properties-container {
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  gap: 100px;
}

@media only screen and (min-width: 700px) {
  


}



</style>