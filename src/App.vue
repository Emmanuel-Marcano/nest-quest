<script setup>
// Imports
// import { RouterLink, RouterView } from 'vue-router'
import {ref, watch, onMounted} from 'vue'
import Header from './components/Header.vue'
import Showcase from './components/Showcase.vue'
import PropertyCard from './components/PropertyCard.vue'
import NoResults from './components/NoResults.vue'


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
  console.log(data)
  properties.value = data;
  filteredProperties.value = data
})


function onInputChange(ev){
  watch(ev, function(){
    console.log(ev)
     console.log(ev.sizeInput)

     // Creates a new array and stores it in the filteredProperties variable
     // This avoids the mutation of the original array. 
     filteredProperties.value = properties.value.filter(function(property){
     return property.location.city.toLowerCase().includes(ev.cityInput.toLowerCase()) && property.rooms.bedrooms >= ev.bedroomsInput && property.rooms.bathrooms >= ev.bathroomsInput && property.size >= ev.sizeInput
     
  })
})


}
</script>

<template>
    <Header/>
    <Showcase @search="onInputChange" :properties="properties"/>
    <p class="text-center">Results:   {{ filteredProperties.length }}</p>
    <main>
        <div class="container">
            
            <div class="properties-container">
              <PropertyCard v-if="filteredProperties.length"  v-for="filteredProperty in filteredProperties" :key="filteredProperty.id" :property="filteredProperty"/>
              <NoResults v-else/>
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
