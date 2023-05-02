<script setup>
import { onMounted } from 'vue'
import { usePropertiesStore } from '../stores/PropertyStore';
import gsap from 'gsap'
import usePropertyFetch from '../composables/usePropertyFetch'
import Showcase from '../components/Showcase.vue'
import PropertyCard from '../components/PropertyCard.vue'
import fallbackPropertyCard from '../components/fallbackPropertyCard.vue'

const propertyStore = usePropertiesStore()





onMounted(async function(){
     await propertyStore.getProperties()
    //  console.log(propertyStore.properties)
})




// ******** CSS Transitions **********

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


</script>


<template>
    <Showcase/>
    <p class="text-center available-properties">Available Properties ({{ propertyStore.filteredByUserInput.length }})</p>
    <main>
        <div class="container">
            <div v-if="propertyStore.filteredByUserInput.length" class="properties-container">
                  <TransitionGroup appear @before-enter="beforeCardEnters" @enter="cardEnters" @after-enter="afterCardEnters">
                  <PropertyCard  v-for="property in propertyStore.filteredByUserInput" 
                   :key="property.id" 
                   :property="property"/>
                  </TransitionGroup>
            </div>
            <div v-else class="properties-container"> 
                <fallbackPropertyCard/>
                <fallbackPropertyCard/>
                <fallbackPropertyCard/>
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

.available-properties {
  /* font-weight: 700; */
}





@keyframes loading {
  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }
}


@media only screen and (min-width: 700px) {
  


}



</style>