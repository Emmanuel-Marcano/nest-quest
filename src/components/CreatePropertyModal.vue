
<script setup>
import { ref, reactive } from 'vue';
import usePropertyFetch from '../composables/usePropertyFetch';
import { usePropertiesStore } from '../stores/PropertyStore';
import router from '../router';


const {editProperty} = defineProps(['editProperty'])

const propertyStore = usePropertiesStore()

// const {createProperty} = usePropertyFetch()



let property = reactive({
    price: "0.00",
    bedrooms: "",
    bathrooms: "",
    size: "",
    streetName: "",
    houseNumber: "81",
    numberAddition: "1",
    zip: "",
    city: "",
    constructionYear: "",
    hasGarage: false,
    description: ""
})

// If editProperty is populated, display all of the existing params to the user
if(editProperty) {
    property.price = editProperty.price
    property.bedrooms = editProperty.rooms.bedrooms
    property.bathrooms = editProperty.rooms.bathrooms
    property.size = editProperty.size
    property.streetName = editProperty.location.street
    property.houseNumber = "20"
    property.numberAddition = "1"
    property.zip = editProperty.location.zip
    property.city = editProperty.location.city
    property.constructionYear = editProperty.constructionYear
    property.hasGarage = editProperty.hasGarage
    property.description = editProperty.description
}



let closeModal = ref(false)
let emit = defineEmits(["close-modal"])

function handleCloseModal(){
    // property.price = ""
    // property.bedrooms = 1
    // property.bathrooms = 1
    // property.size = 1
    // property.streetName = ""
    // property.houseNumber = "21"
    // property.numberAddition = "1"
    // property.zip = ""
    // property.city = ""
    // property.constructionYear = ""
    // property.hasGarage = false
    // property.description = ""
    closeModal.value = !closeModal.value
}

async function handleSubmit(event){
    event.preventDefault();
    

    // Spreads all of the properties in the property object into the local data object
    const data = {...property}
    console.log(data)

    let errorArray = []
    let creationResponse = prompt("Are you sure you want to create?")
    if(creationResponse === 'Yes'){

         if(editProperty){
            propertyStore.editProperty(editProperty.id, data).then(function(response){
            console.log(`Property edited = ${response}`)
            window.location.reload()
        })
         } else {
            propertyStore.createProperty(data).then(function(response){
            console.log(`Property created = ${response}`)
            closeModal.value = !closeModal.value
            console.log("did it")
            window.location = "http://localhost:8080/MyProperties"
        })
       }
    }
}

function clearAllInputs(){
   


}

emit("close-modal", closeModal)





</script>

<template>

    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-title">
                <img class="modal-icon" src="../assets/images/house-icon.png" alt="">
                <h1 v-if="editProperty">Edit Property</h1>
                <h1 v-else>Create Property</h1>
            </div>
            <form @submit="handleSubmit" class="form-grid" action="">
                <div class="form-control">
                    <div class="form-icon">
                     <img src="../assets/images/ic_location@3x.png" alt="">
                    </div>
                    <input v-model="property.city" placeholder="City" type="text">
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <i class="fa-solid fa-house fa-2x"></i>
                    </div>
                    <input v-model="property.streetName" placeholder="Street" type="text">
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <i class="fa-regular fa-hashtag fa-2x"></i>
                    </div>
                    <input v-model="property.zip" placeholder="Zip Code" type="text">
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_bed@3x.png" alt="">
                    </div>
                    <select v-model="property.bedrooms" name="" id="">
                                <option value="" disabled selected>No. of Bedrooms</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>    
                    </select>
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_bath@3x.png" alt="">
                    </div>
                    <select  v-model="property.bathrooms"  id="">
                                <option value="" disabled selected>No. of Bathrooms</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>    
                    </select>
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_size@3x.png" alt="">
                    </div>

                    <input v-model="property.size" placeholder="Property Size" type="text">
                </div>
                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_garage@3x.png" alt="">
                    </div>
                    <select v-model="property.hasGarage" name="" id="" >   
                                <option value="" disabled selected>Has Garage</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>      
                    </select>
                </div>

                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_construction_date@3x.png" alt="">
                    </div>
                    <input v-model="property.constructionYear" placeholder="Enter construction year" type="text">
                </div>

                <div class="form-control">
                    <div class="form-icon">
                        <img src="../assets/images/ic_price@3x.png" alt="">
                    </div>
                    <input v-model="property.price" placeholder="Enter price" type="text">
                </div>
              
                <div class="form-control description">
                    <textarea v-model="property.description" placeholder="Description" name="" id="" cols="30" rows="3"></textarea>
                </div>

                <div class="modal-buttons">   
                    <span class="cancel-btn" @click="handleCloseModal">Cancel</span>
                    <button class="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>

.modal {
    width: 90%;
    max-width: 750px;
    overflow: scroll;
    background-color: white;
    transform: translateY(-50px);
    border-radius: 10px;
    opacity: 0;
    animation: slide-in 0.3s ease forwards;
}

.modal-title{
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 8px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgb(96, 96, 96);
    background-color: var(--primary-color);

    
}

.modal-icon{
    width: 60px;
    height: 50px;
}

.modal h1{
    color: white;
    font-size: 26px;
    font-weight: 500;
}

.modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: end;
}

.modal-buttons button {
    border: none;
    border-radius: 3px;
    padding: 10px 25px;
    cursor: pointer;
}

.modal-buttons span{
    border: none;
    border-radius: 3px;
    padding: 10px 25px;
    cursor: pointer;

    
}

.submit-btn {
    background-color: var(--primary-color);
    font-weight: 700;
    color: white;
   
}

.cancel-btn {
    background-color: rgb(172, 172, 170);
}

img{
    width: 30px;
    height: 30px;
}

.form-grid{
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
}

.form-control{
    display: flex;
    align-items: center;
    height: 35px;
}

.form-control input {
    height: 100%;
    width: 100%;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    border: 1px solid black;
}

.form-control select {
    height: 100%;
    width: 100%;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    border: 1px solid black;

}
.form-control textarea {
    /* height: 100%; */
    width: 100%;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    border: 1px solid black;

}

.form-icon{
   
    background-color: rgb(222, 221, 221);
    height: 100%;
    padding: 5px 5px;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
    color:rgb(150, 150, 150);
}




button{
    cursor: pointer;
}

.modal-overlay{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
}





@keyframes slide-in {
    100%{
        opacity: 1;
        transform: translateY(0);

    }
}


@media only screen and (min-width: 700px) {
    .form-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.modal-buttons {
    grid-column: 1/3;
}

.description{
    grid-column: 1/3;
}

}

</style>


