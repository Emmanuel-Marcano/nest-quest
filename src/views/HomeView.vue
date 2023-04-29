<script setup>
import {ref, watch, onMounted, onUpdated} from 'vue'
import gsap from 'gsap'

import Showcase from '../components/Showcase.vue'
import PropertyCard from '../components/PropertyCard.vue'
import NoResults from '../components/NoResults.vue'


// Start up
const fetchOptions = {
    headers: {
      "X-Api-Key": "06mRI1jJ7CbUWDNtMFyvhP3oO4A_a5Tl"
    }
  }



// Data
let properties = ref([])
let filteredProperties = ref([])


// Lifecycle methods
onMounted(async function(){
  let response = await fetch("https://api.intern.d-tt.nl/api/houses", fetchOptions)
  let data = await response.json()
//   console.log(data)
  properties.value = data;
  filteredProperties.value = data
})


function onInputChange(ev){
//   console.log("Oninput")

     watch(ev, function(){
     console.log(ev.cityInput)
     filteredProperties.value = properties.value.filter(function(property){
     return property.location.city.toLowerCase().includes(ev.cityInput.toLowerCase()) && property.rooms.bedrooms >= ev.bedroomsInput && property.rooms.bathrooms >= ev.bathroomsInput && property.size >= ev.sizeInput

//      Creates a new array and stores it in the filteredProperties variable
//      This avoids the mutation of the original array and allows me to always
//      return a result instead of mutating the original one until its empty
})
})

}

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
     <Showcase @search="onInputChange"/>
    <p class="text-center">Results: {{ filteredProperties.length }}</p>
    <main>
        <div class="container">
            <div class="properties-container">
              <TransitionGroup appear @before-enter="beforeCardEnters" @enter="cardEnters" @after-enter="afterCardEnters">
              <PropertyCard v-for="filteredProperty in filteredProperties" 
              :key="filteredProperty.id" 
              :property="filteredProperty"/>
              </TransitionGroup>
           </div>
        </div>
      </main>
</template>



<style scoped>
main {
    padding: 20px 0;
   
}

.properties-container {
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  gap: 100px;
  
}



</style>