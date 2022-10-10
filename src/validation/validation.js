const isValidRequestBody = function(value){
    return Object.keys(value).length>0
}

const ValidName = /^[a-zA-Z. ]{3,20}$/
const ValidEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
const ValidPhone = /^[6-9]{1}[0-9]{9}$/

module.exports= {isValidRequestBody, ValidPhone, ValidEmail, ValidName}