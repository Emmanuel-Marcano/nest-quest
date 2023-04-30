<script setup>
import { ref, onMounted} from 'vue';
import PropertyCard from '../components/PropertyCard.vue';
import usePropertyFetch from '../composables/usePropertyFetch';

const {getProperties, deleteProperty} = usePropertyFetch()


let properties = ref([])

onMounted(async function(){
  let response = await getProperties()
  properties.value = response.data;
  properties.value = properties.value.filter(function(property){
    return property.madeByMe
    })
})




</script>


<template>
    <h1>My properties</h1>

    <div class="properties-container">

    <PropertyCard v-for="property in properties" 
              :key="property.id" 
              :property="property"/>

    </div>

   
  
</template>



<style scoped>

.properties-container {
    padding: 40px;
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  gap: 100px;
  
}



</style>