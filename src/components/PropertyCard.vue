
<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { usePropertiesStore } from '../stores/PropertyStore';
const propertyStore = usePropertiesStore()
const {property} = defineProps(['property'])

let favorite = false;
 favorite = propertyStore.favoriteProperties.some(function(prop){
    return prop.id === property.id
})



</script>


<template>

<div class="property-card">
                <div class="property-image">
                    <img v-if="property.image" :src="property.image" alt="">
                    <img v-else src="../assets/images/ic_mobile_navigarion_home@3x.png" alt="">
                </div>
                <!-- holds the info and adds padding all around -->
                <div class="property-info">
                    <div class="property-location">
                        <img src="../assets/images/ic_location@3x.png" alt="">
                        <div>
                            <h2>{{ property.location.city }}</h2>
                            <p  class="text-muted">{{ property.location.street }}</p>
                            <span class="text-muted">{{ property.location.zip }}</span>
                        </div>
                        <i v-show="favorite" class="favorite fa-solid fa-heart fa-2x"></i>
                    </div>
                    <div class="property-utilities">
                        <div>
                            <img src="../assets/images/ic_bed@3x.png" alt="">
                            <span>{{ property.rooms.bedrooms }}</span>
                        </div>
                        <div>
                            <img src="../assets/images/ic_bath@3x.png" alt="">
                            <span>{{ property.rooms.bathrooms }}</span>
                        </div>
                        <div>
                            <img src="../assets/images/ic_garage@3x.png" alt="">
                            <span>{{ property.hasGarage? "Yes" : "No"}}</span>
                        </div>
                        <div>
                            <img src="../assets/images/ic_size@3x.png" alt="">
                            <span>{{ property.size }}m<sup>2</sup></span>
                        </div>
                    </div>
                    <div class="property-price">
                        <div>
                          <img src="../assets/images/ic_price@3x.png" alt="">
                          <span>{{ property.price }}</span>
                        </div>
                        <RouterLink :to="`/properties/${property.id}`" class="details-btn">Details</RouterLink>
                    </div>
                 </div>
            </div>
</template>



<style scoped> 

img{
    width: 100%;
    height: 100%;
    
}

.property-card {
    width: 320px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.property-image{
    height: 220px;
}



.property-info{
    padding: 15px;
}

.property-location {
    display: flex;
    gap: 10px;
  
}

.property-location h2 {
    margin: 0;
    font-weight: 400;
}

.property-location  p {
    margin: 5px 0;
}

.property-location img {
    width: 25px;
    height: 30px;
}

.property-utilities {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin: 10px 0;
    gap: 10px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
}

.property-utilities img {
    width: 30px;
    height: 30px;
    display: block;
    border: 1px solid black;

}


.property-utilities span {
    width: 100%;
    display: inline-block;
    margin-top: 10px;
    text-align: center;
    
}

.property-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
}

.property-price img{
    width: 30px;
    height: 30px;
}

.property-price div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.details-btn {
    padding: 6px 20px;
    background-color: var(--primary-color);
    border: none;
    border-radius: 7px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
}

.details-btn:hover {
    background-color: rgba(235, 84, 64, 0.8);
}

.favorite{
    color: red;
    justify-self:self-end;
    margin-left: auto;
    animation: beat 0.5s ease infinite alternate;
    /* margin-top: 15px; */
   
   
   
}

@keyframes beat{
    0%{
        transform: scale(1);
    }
    100%{
        transform: scale(1.1);
    }
}


/* .info-icon {
    width: 100px;
    height: 10px;
} */






</style>