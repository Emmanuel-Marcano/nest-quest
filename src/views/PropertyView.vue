<script setup>
import {useRoute} from 'vue-router'
import usePropertyFetch from '../composables/usePropertyFetch';
import router from '../router'
import gsap from 'gsap'
import { ref, onMounted} from 'vue';


const {getProperties, deleteProperty} = usePropertyFetch()



  



let route = useRoute()
let newInteriorImage = ref("")
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
  let response = await getProperties()
  properties.value = response.data;
  property.value = properties.value.find(function(property){
    return property.id === parseInt(route.params.id)
    })
})

// Fetches a random interior decoration image from the unsplash api
  async function fetchImage(){
      let response = await fetch("https://source.unsplash.com/1600x900/?house-interior")
      console.log(response.url)
      newInteriorImage.value = response.url
  }

  async function handleDeletion(){
   let deletionResponse = prompt("are you sure you want to delete?")
   if(deletionResponse === 'Yes'){
        deleteProperty(route.params.id).then(function(response){
          console.log(`Property deleted = ${response}`)
        })
    }
    else{
      router.push('/MyProperties')
    }
        

   
  }

  fetchImage()
</script>


<template>
    <div class="container">
      <div class="property-images">
    <img class="exterior-image"  :src="property.image" alt="">
    <img class="interior-image" :src="newInteriorImage" alt="">
  </div>
      <div class="property">
        <div class="property-details">
          <h1>Property detailed view</h1>
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
            <button class="delete-btn" v-on:click="handleDeletion">Delete</button>
          </ul>
        </div>
          <div class="property-card">
            <div class="property-price">
              <div class="price-label">
                <img src="../assets/images/ic_price@3x.png" alt="">
                <span>{{ property.price }}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="long-height"></div>

 
  
</template>



<style scoped>

.property-images {
  display: flex;
  height: 400px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  

}

.property-images > * {
  flex-basis: 100%;
}

.property{
  display: flex;
  justify-content: space-around;
  top: -120px;
  height: 1200px;
  position: relative; 
  border-bottom: 1px solid rgb(199, 199, 199);
}

.property-details {
  width: 700px;
  margin-top: 200px;
}

.property-card{
  position: sticky;
  top: 100px;
  width: 280px;
  height: 420px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin: 50px 0;
  background-color: white;
}

.property-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-label{
  position: absolute;
  padding: 5px;
  top: 20px;
  right: -20px;
  display: flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  font-weight: 700;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.price-label::after{
  content: "";
  position: absolute;
  background-color: var(--primary-color);
  height: 100%;
  width: 80px;
  bottom: -8px;
  right: 0px;
  z-index: -1;
  transform: skewY(-10deg);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.property-price img{
  width: 40px;
  height: 40px;
}

.property-price span {
  font-size: 22px;
}

.long-height{
  height: 150px;
}

.delete-btn{
  padding: 10px 20px;
  background-color: var(--primary-color);
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 700;


}


</style>