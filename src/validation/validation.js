const { validate } = require("../models/userModel")
const mongoose=require("mongoose") 
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


const isValidString = (String) => {
    if (/\d/.test(String)) {
      return false
    } else {
      return true
    }
  }
const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
  };
  
  const isValidPassword = (value)=>{
    return (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,16}$/)
}

module.exports= {isValidRequestBody,isValidString,ValidPhone,isValidPassword, ValidEmail, ValidName,isValid,isValidObjectId}