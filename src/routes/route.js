const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})


let players=[{
    "name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": [
    "swimming"
    ]
    },
    {
     "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
        "socker"
        ]    
    },
{
    "name": "lokesh",
    "dob": "1/1/1990",
    "gender": "male",
    "city": "mumbai",
    "sports": [
        "soccer"
    ]
},
]
    router.post('/players', function (req, res) {
let newPlayerPost=req.body
let newplayerName=newPlayerPost.name
isNameRepeatedInPost=false//set flag bydafalut value which is false
        for(i=0;i<players.length;i++){
            if(players[i].name==newplayerName){
            isNameRepeatedInPost=true//set flag true if above condition true
            break;//if not condition true break the loop
            }
        }
            if(isNameRepeatedInPost){
      res.send("this player name is already exit")
            }
            else{
                players.push(newplayerName)
                res.send(players)
            }
        
        res.send(  { data: players , status: true }  )
    })

    router.post("/wikipedia/queryPrarams",function(req,res){
let countryValue=req.query
res.send({countryValue,status:true})

})
router.get("/queryPrarams-2",function(req,res){
 let marks=req.query.marks
    let result=marks>40?"pass":"fail"
    res.send({data:result,status:true})
    })
   
 let person=[
    {
    name:"Pk",
    age:10,
    votingstatus:false
 },
 {
    name:"Sk",
    age:20,
    votingstatus:false
 },
 {
    name:"AA",
    age:70,
    votingstatus:false
 },
 {
    name:"SC",
    age:5,
    votingstatus:false
 },
 {
    name:"HO",
    age:40,
    votingstatus:false
 },
]
router.post("/votingsystem",function(req,res){
    let votingAge=req.query.age
    let eligibleForVote=[]
for(i=0;i<person.length;i++)  
{
    if(person[i].age>votingAge){
person[i].votingstatus=true
eligibleForVote.push(person[i])
    }
}  
res.send({person:eligibleForVote,status:true})

})
module.exports = router;