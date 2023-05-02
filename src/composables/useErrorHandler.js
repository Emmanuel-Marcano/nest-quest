export default function(data){

    let errorsArray = []

    if(data.price === ""){
        errorsArray.push("Please enter a price")
    }

    if(data.bedrooms === ""){
        errorsArray.push("Please enter No. of bedrooms")
    }

    if(data.size === ""){
        errorsArray.push("Please enter size")
    }

    if(data.streetName === ""){
        errorsArray.push("Please enter a street name")
    }

    if(data.zip === ""){
        errorsArray.push("Please enter a zip code")
    }

    if(data.city === "") {
        errorsArray.push("Please enter a city")
    }

    if(data.constructionYear === "") {
        errorsArray.push("Please enter a construction year")
    }

    if(data.hasGarage === "") {
        errorsArray.push("Please enter if it has a garage")
    }

    if(data.description === "") {
        errorsArray.push("Please enter a description")
    }

    return errorsArray







}