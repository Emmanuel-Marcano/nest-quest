<script setup>
import {useRoute} from 'vue-router'
import { ref, onMounted, reactive } from 'vue';

const fetchOptions = {
    headers: {
      "X-Api-Key": "06mRI1jJ7CbUWDNtMFyvhP3oO4A_a5Tl"
    }
  }

let route = useRoute()
let properties = ref([])
let property = ref({
    constructionYear: 0,
    createdAt: "",
    description: "",
    hasGarage: false,
    id: "",
    image: "",
    location: {
        city: "",
        street: "",
        zip: ""

    },
    madeByme: false,
    price: 0,
    rooms: {
        bathrooms: 1,
        bedrooms: 1
    },
    size: 0 
})


// Lifecycle methods
onMounted(async function(){
  let response = await fetch("https://api.intern.d-tt.nl/api/houses", fetchOptions)
  let data = await response.json()
  properties.value = data;
  property.value = properties.value.find(function(property){
    return property.id === parseInt(route.params.id)
    })
})
</script>


<template>
    <h1>Property View</h1>
   <ul>
        <li> City = {{ property.location.city }}</li>
        <li> Street = {{ property.location.street }}</li>
        <li> Zip = {{ property.location.zip }}</li>
        <li> No. of bedrooms = {{ property.rooms.bedrooms }}</li>
        <li> No. of bathrooms = {{ property.rooms.bathrooms }}</li>
        <li> Has Garage? = {{ property.hasGarage }}</li>
        <li> Size = {{ property.size }}</li>
        <li> Description = {{ property.description }}</li>
        <li> Construction Year = {{ property.constructionYear }}</li>
        <li> Price = {{ property.price }}</li>
   </ul>
   <img :src="property.image" alt="">
</template>



<style scoped>



</style>