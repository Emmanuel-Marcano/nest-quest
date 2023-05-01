
import { defineStore } from 'pinia'
import usePropertyFetch from '../composables/usePropertyFetch'
const {getProperties, createProperty, editProperty, deleteProperty} = usePropertyFetch()

export const usePropertiesStore = defineStore("propertyStore", {
    state: function() {
        return {
        properties: [],
        searchInput: {
            cityInput: "",
            bedroomsInput: 1,
            bathroomsInput: 1,
            sizeInput: 50
        }
        }
    },

    getters: {
        filteredByUserInput: (state) => {
                return state.properties.filter(function(property){
                return property.location.city.toLowerCase().includes(state.searchInput.cityInput.toLowerCase()) && property.rooms.bedrooms >= state.searchInput.bedroomsInput && property.rooms.bathrooms >= state.searchInput.bathroomsInput && property.size >= state.searchInput.sizeInput
                })
        },

        propertiesLength: (state) => {
            return state.properties.length
        },

        madeByMe: (state) => {
            return state.properties.filter(function(property){
            return property.madeByMe
            })
        },
    },

    actions: {
        async getProperties(){
            const response = await getProperties()
            this.properties = response.data
        },

        async createProperty(data){
            let response = await createProperty(data)
            return response
        },

        async editProperty(id, data){
            let response = await editProperty(id, data)
            return response
        },

        async deleteProperty(id){
            let response = await deleteProperty(id)
            return response
        },

        updateSearchInput(searchData){
            this.searchInput = searchData
        },

        findByID(id) {
                let foundProperty
                foundProperty = this.properties.find(function(property){
                return property.id === id })
                return foundProperty
        }
    }
})

