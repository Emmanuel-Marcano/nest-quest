<script setup>
import {onMounted} from 'vue';
import PropertyCard from '../components/PropertyCard.vue';
import { usePropertiesStore } from '../stores/PropertyStore';

const propertyStore = usePropertiesStore()

onMounted(async function(){
     await propertyStore.getProperties()
})
</script>


<template>
    <h1>My properties</h1>
     <div class="properties-container">
      <PropertyCard v-for="property in propertyStore.madeByMe" 
              :key="property.id" 
              :property="property"
        />
    </div>
</template>



<style scoped>

.properties-container {
    padding: 40px;
  display: flex;

  flex-wrap: wrap;
  gap: 100px;
  
}



</style>