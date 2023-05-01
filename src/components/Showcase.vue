<script setup>
import { reactive, watch } from 'vue'
import { usePropertiesStore } from '../stores/PropertyStore';
import gsap from 'gsap'


const propertyStore = usePropertiesStore()



// Data
let search = reactive({
    cityInput: "",
    bedroomsInput: 1,
    bathroomsInput: 1,
    sizeInput: 50
})


// Updates the searchInput state property in Pinia
watch(search, function(){
    propertyStore.updateSearchInput(search)   
})






 

// Methods
function clear(){
  search.cityInput = ""
}

function clearAllFilters(){
    search.cityInput = ""
    search.bedroomsInput = 1
    search.bathroomsInput = 1
    search.sizeInput = 50
}


function handleSubmit(e){
    e.preventDefault();
}


// CSS TRANSITIONS

function beforeTitleEnters(el){
    el.style.opacity = 0
    el.style.transform = "translateY(-60px)"
}

function titleEnters(el){
    gsap.to(el, {
        y: 0,
        opacity:1,
        duration: 1
    })


}

function afterTitleEnters(el){
  

  



}

function beforeBarEnters(el){
    // el.style.opacity = 0
    el.style.width = '0%'
    el.style.opacity = 0


}
function afterBarEnters(el){

  
}

function barEnters(el){
    gsap.to(el, {
        opacity:1,
        width: "90%",
        duration: 1,
        // delay: 1

    })


}




// Actions
</script>


<template>
    <div class="showcase-section">
            <div class="bg-image"></div>
            <div class="showcase-content">
                <Transition appear @before-enter="beforeTitleEnters" @enter="titleEnters" @after-enter="afterTitleEnters"><p class="showcase-text">Your <span class="accent-logo">Quest</span>  for the perfect home ends here</p></Transition>
                <Transition appear @before-enter="beforeBarEnters" @enter="barEnters" @after-enter="afterBarEnters" >
                <div class="showcase-form">
                    <form v-on:submit="handleSubmit"  action="">
                        <div>
                            <i class="clear-icon fa-solid fa-circle-xmark" v-show="search.cityInput.length" v-on:click="clear" ></i>
                            <input v-model="search.cityInput"  placeholder='  Try "Amsterdam"'>
                        </div>
                        <div>
                            <img class="bedroom-icon" src="../assets/images/ic_bed@3x.png" alt="">
                            <select v-model="search.bedroomsInput" name="" id="">
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                                <option value="6">6+</option>
                            </select>
                        </div>
                        <div>
                            <img class="bathroom-icon" src="../assets/images/ic_bath@3x.png" alt="">
                            <select v-model="search.bathroomsInput" name="" id="">
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                                <option value="6">6+</option>    
                            </select>
                        </div>
                        <div>
                            <img class="bathroom-icon" src="../assets/images/ic_size@3x.png" alt="">
                            <select class="last-select" v-model="search.sizeInput" name="" id="">
                                <option value="50">50+</option>
                                <option value="100">100+</option>
                                <option value="150">150+</option>
                            </select>
                        </div>
                        <span v-show="search.cityInput.length || search.bedroomsInput > 1 || search.bathroomsInput > 1 || search.sizeInput > 50" v-on:click="clearAllFilters" class="clear-filters">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            Clear all filters
                        </span>
                    </form>
                </div>
                </Transition>
            </div>
    </div>
</template>



<style scoped>

.showcase-section{
    height: 70vh;
    position: relative; 
}

p{
    margin: 0;
}


img {
    position: absolute;
    width: 30px;
    right: 30px;
}

form {
    width: 100%;
}

input {
    width: 99.5%;
    padding: 0px;
    height: 52px;
    border: 1px solid black;
    border-radius: 7px;
    
}

select {
    width: 100%;
    height: 54px;
    border: 1px solid black;
    padding: 0;
    border-radius: 7px;
    cursor: pointer;
    
}

select:hover{
    background-color: #cdcccc;
}


form > * {
    flex-basis: 100%;
}

.clear-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: rgb(167, 167, 167);
}

.clear-icon:hover{
    color: var(--primary-color);

}


.clear-icon:hover::after{
    opacity: 1;
    display: block;
    transform: translateX(0);
}




.bedroom-icon{
    top: 16px;
}

.bathroom-icon{
    top: 12px;
}


.bg-image {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/showcasebg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position:top;
    filter: blur(3px);
}

.showcase-content{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;


    /* opacity: 0;
    transform: translateY(-50px);
    animation: slide-in 1s ease forwards;
    animation-delay: 0.8s; */
}

/* .title-enter-from {
    opacity: 0;
    transform: translateY(-50px);


}

.title-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.title-enter-active {
    transition: all 1s ease;
} */

/* .container {
    position: relative;
    height: 100%;


} */

.showcase-text {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    /* text-shadow: 2px 2px 4px #000000; */
    /* text-shadow: 
      1px 1px 0px #faf7f7, 
      5px 5px 0px rgba(0, 0, 0, 0.1); */
    
    color: #3d3d3d;
    color: white;
}

.showcase-form {
    /* width: 90%; */
    display: flex;
    justify-content: center; 


    /* Adds animation to gradually expand the search bar */
    /* animation: expand-bar 0.8s ease forwards;
    animation-delay: 2s; */
}

/* .bar-enter-from{
    width: 0%;
    opacity: 0;


}

.bar-enter-to {
    width: 90%;
    opacity: 1;
   

}

.bar-enter-active {
    transition: all 1s ease;
    transition-delay: 1.5s;


} */

.showcase-form form {
    display: flex;
    flex-direction: column;
    gap: 25px; 
}


/* position relative to add bounds to the absolute icons  */
.showcase-form div {
    position: relative;
}



.clear-filters {
    position: absolute;
    background-color: var(--primary-color);
    color: white;
    font-weight: 500;
    padding: 6px 6px;
    border-radius: 5px;
    cursor: pointer;
    bottom: 45px;
    right: 125px;
    opacity: 0;
    transform: translateY(-20px);
    animation: slide-in 0.5s ease forwards;
}

.clear-filters:hover{
    background-color: rgba(235, 84, 64, 0.8);


}


@media only screen and (min-width: 700px) {

    /* .showcase-form {
        margin-bottom: 50px;
    } */


    .clear-filters {
        bottom: 150px;
        right: 80px;
    }

    select {
        border-radius: 0;
    }

    .last-select {
        border-radius: 0;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }

    input{
        border-radius: 0;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }
  .showcase-form form {
    flex-direction: row;
    gap: 0;
   
    
  }

  .bg-image {
    background-position:left;

  }

  .showcase-text {
    font-size: 50px;
  }
}

@keyframes slide-in {
    100%{
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes expand-bar{
    100%{
        opacity: 1;
        width: 90%;
    }
}

</style>