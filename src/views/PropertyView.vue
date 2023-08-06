<script setup>
import { useRoute } from 'vue-router'
import CreatePropertyModal from '../components/CreatePropertyModal.vue';
import { usePropertiesStore } from '../stores/PropertyStore';
import router from '../router'
import { ref,onMounted, watch } from 'vue';


const propertyStore = usePropertiesStore()
const route = useRoute()
let selectedImage = ref("")
let showEditModal = ref(false)
let newInteriorImage = ref("")
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



onMounted(async function(){
 await propertyStore.getProperties()
 property.value = propertyStore.findByID(parseInt(route.params.id))
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
          propertyStore.deleteProperty(route.params.id).then(function(response){
          console.log(`Property deleted = ${response}`)
          window.location = "http://localhost:8080/MyProperties"
        })
       
    }

    else{
      router.push('/MyProperties')
    }
      
  }


  async function handleEdit(){
    // propertyStore.findByID(parseInt(route.params.id))

    showEditModal.value = !showEditModal.value

  }

  function handleImageSelection(e){
    e.preventDefault();
    selectedImage = e.target.files[0]
  }

  function handleImageUpload(){
    console.log(selectedImage)




    let data =  new FormData()
    data.append('image', selectedImage)
    propertyStore.uploadImage(route.params.id, data).then(function(response){
    console.log(`Image uploaded = ${response}`)
    window.location.reload()
    })
  }


  // Listens for the emit from the modal, when clicked,
  // Closes edit property modal
  function closeModal(e){
    watch(e, function(){
    console.log(e.value)
    showEditModal.value = !showEditModal.value
  })

  }

  function addToFavorites(){
    propertyStore.addFavoriteProperty(property.value)
    console.log(propertyStore.favoriteProperties)

  }

  fetchImage()
</script>


<template>
    <CreatePropertyModal @close-modal="closeModal" :editProperty="property" v-if="showEditModal"/>
    
    <div class="container">
      <div class="property-images">
        <img v-if="property.image" :src="property.image" alt="">
        <img v-else src="../assets/images/ic_mobile_navigarion_home@3x.png" alt="">
        <img class="interior-image" :src="newInteriorImage" alt="">
      </div>
      <div class="property">
        <div class="property-details">
          <!-- <h1>Property detailed view</h1> -->
          <ul>
            <li> <img id="location" src="../assets/images/ic_location@3x.png" alt="">  City: {{ property.location.city }}</li>
            <li> <img src="../assets/images/ic_mobile_navigarion_home@3x.png" alt=""> Address: {{ property.location.street }} {{ property.location.zip }}</li>
            <!-- <li> Zip: {{ property.location.zip }}</li> -->
            <li> <img src="../assets/images/ic_bed@3x.png" alt=""> No. of bedrooms: {{ property.rooms.bedrooms }}</li>
            <li> <img src="../assets/images/ic_bath@3x.png" alt=""> No. of bathrooms: {{ property.rooms.bathrooms }}</li>
            <li> <img src="../assets/images/ic_garage@3x.png" alt="">Garage: {{ property.hasGarage? "Yes" : "No" }}</li>
            <li> <img src="../assets/images/ic_size@3x.png" alt=""> Size: {{ property.size }}</li>
            <li> <img src="../assets/images/ic_mobile_navigarion_info@3x.png" alt=""> Description: {{ property.description }}</li>
            <li> <img src="../assets/images/ic_construction_date@3x.png" alt=""> Construction Year: {{ property.constructionYear }}</li>
            <li @click="addToFavorites"> <i class="favorite fa-solid fa-heart fa-2x"></i>Add to favorites </li>
          </ul>
          <div v-show="property.madeByMe" class="edit-delete-btns">
            
                <label for="img">Select image:</label>
                <input  @change="handleImageSelection" type="file" id="img" name="img" accept="image/*">
                <button @click="handleImageUpload" class="upload-btn">Upload image</button>
          
            <button @click="handleEdit" class="edit-btn">Edit</button>
            <button class="delete-btn" v-on:click="handleDeletion">Delete</button>
          </div>
        </div>
          <div class="property-card">
            <div class="property-price">
              <span class="nest-quest">Nest<span class="accent-logo">Quest</span></span>
              <div class="price-label">
                <img src="../assets/images/ic_price@3x.png" alt="">
                <span>{{ property.price }}</span>
              </div>
            </div>
            <div class="card-buttons">
              <button class="contact-agent">Contact the estate agent</button>
              <button class="plan-viewing">Plan a viewing</button>
            </div>
            <div class="share">
              <i class="fa-brands fa-facebook-f fa-2x"></i>
              <i class="fa-solid fa-comments fa-2x"></i>
              <i class="fa-brands fa-twitter fa-2x"></i>
              <i class="fa-solid fa-envelope fa-2x"></i>
            </div>
          </div>
      </div>
    </div>
    <div class="long-height"></div>

 
  
</template>



<style scoped>

#location{
  width: 35px;
  height: 40px;
}



ul{
  list-style: none;
  padding: 0;
}

.property-images {
  display: flex;
  flex-direction: column;
  height: 400px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  

}

.interior-image{
  overflow: hidden;

}


.property{
  /* padding: 50px 0; */
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-bottom: 1px solid rgb(199, 199, 199); */
}

/* .property-details {
 
  
} */

.property-card{
  width: 90%;
  padding:  20px 15px;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin: 50px 0px;
  background-color: white;
}

.nest-quest{
  /* border: 1px solid black; */
  font-size: 28px;
  
  
}

.property-price {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0px;
  /* border: 1px solid black; */
}

.price-label{
  position: absolute;
  padding: 5px;
  top: 2px;
  right: -30px;
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

.property-price .price-label {
  font-size: 20px;
}

.long-height{
  height: 150px;
}



.card-buttons {
  border-top: 1px solid rgb(168, 166, 166);
  border-bottom: 1px solid rgb(168, 166, 166);
  text-align: center;
  margin-top: 30px;
  padding: 20px 0;
}


.card-buttons button {
  
  font-weight: 700;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  /* padding: 10px 45px; */
  margin: 10px 0;
  width: 100%;


}

.contact-agent{
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 0;
  
}

/* .contact-agent:hover {
  background-color: rgba(235, 84, 64, 0.8);
} */

.plan-viewing {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  border-color: var(--primary-color);
  color: black;
  padding: 10px 0;
}

/* .plan-viewing:hover{
  background-color: rgb(250, 250, 250);
} */

.share {
  margin-top: 25px;
  border: 1px solid rgb(168, 166, 166);
  padding: 15px 0;
  text-align: center;
  color: var(--secondary-color);
  /* color: rgb(121, 121, 121); */
 
  
}

.share i {
  transition: transform 0.3s ease;
}

.share i:hover {
  transform: translateY(-3px);

}

.share > * {
  margin: 0 10px;
}


.property-details img{
  width: 40px;
  height: 40px;
}

li {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  font-weight: 300;
  padding: 40px 0;
  border-bottom: 1px solid rgb(200, 199, 199);
}

.edit-delete-btns{
  margin: 10px 0;
}

.edit-delete-btns button {
  font-weight: 900;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  padding: 10px 25px;
  margin: 10px;
  color: white;
}

.delete-btn{
  background-color: var(--primary-color);
}

.delete-btn:hover {
  background-color: rgba(235, 84, 64, 0.8);
}

.edit-btn{
  background-color: var(--secondary-color);
}

.upload-btn {
  background-color: var(--secondary-color);
}

.favorite{
  cursor: pointer;
  transition: transform 0.3s ease;
}

.favorite:hover{
  color: red;
  transform: translateY(-5px);
}




@media only screen and (min-width: 700px) {
  .property-images{
    flex-direction: row;
  }


  .property {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 0;
    /* top: -460px; */
   
  }

  .property-details {
    width: 70%;
    /* margin-top: 450px; */

  }

  .property-card {
    position: sticky;
    top: 100px;
    width: 25%;
    margin: 50px 50px;
  }

}


</style>