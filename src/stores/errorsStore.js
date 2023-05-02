import { defineStore } from 'pinia'

export const useErrorsStore = defineStore("errorStore", {

    state: () => {
        return {
            errorsArray: [],
            data: {
                price: "",
                bedrooms: "",
                bathrooms: "",
                size: "",
                streetName: "",
                houseNumber: "",
                numberAddition: "",
                zip: "",
                city: "",
                constructionYear: "",
                hasGarage: "",
                description: ""
            }
        }
    },

    getters: {
        errorsArraysLength: (state) => {
            return state.errorsArray.length
        }

        
    },



    actions: {

        updateData(data){
            this.data = data
        },

        resetData(){
            this.data.price = ""
            this.data.bedrooms = ""
            this.data.bathrooms = ""
            this.data.size = ""
            this.data.streetName = ""
            this.data.houseNumber = ""
            this.data.numberAddition = ""
            this.data.zip = ""
            this.data.city = ""
            this.data.constructionYear = ""
            this.data.hasGarage = false
            this.data.description = ""
            
        },

        resetErrorsArray(){
            this.errorsArray = []

        },

        isEmpty(){

         
            this.resetErrorsArray()


            if(this.data.price === ""){
                this.errorsArray.push("Please enter a price")
            }

            if(this.data.bedrooms === ""){
                this.errorsArray.push("Please enter No. of bedrooms")
            }

            if(this.data.size === ""){
                this.errorsArray.push("Please enter size")
            }

            if(this.data.streetName === ""){
                this.errorsArray.push("Please enter a street name")
            }

            if(this.data.zip === ""){
                this.errorsArray.push("Please enter a zip code")
            }

            if(this.data.city === "") {
                this.errorsArray.push("Please enter a city")
            }

            if(this.data.constructionYear === "") {
                this.errorsArray.push("Please enter a construction year")
            }

            if(this.data.hasGarage === "") {
                this.errorsArray.push("Please enter if it has a garage")
            }

            if(this.data.description === "") {
                this.errorsArray.push("Please enter a description")
            }
            

            





            

            // for(const value in this.data){




            //     console.log(`${this.data[value]}`)
            //     console.log(`${!this.data[value].length}`)

            //     if(!this.data[value].length){
            //         this.errorsArray.push("please fill all the inputs")
                   
            //     }



    
            // }
        }


    }




})