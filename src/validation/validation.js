const { validate } = require("../models/userModel")

const isValidRequestBody = function(value){
    return Object.keys(value).length>0
}




   const ValidName=(name)=>{
    return /^[a-zA-Z. ]{3,20}$/.test(name)
   }


const ValidEmail=(name)=>{
    return (/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/).test(name)
}
   
const ValidPhone=(name)=>{
    return  (/^[6-9][0-9]{9}$/).test(name)
}



const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
  };
  


module.exports= {isValidRequestBody, ValidPhone, ValidEmail, ValidName,isValid,isValidObjectId}