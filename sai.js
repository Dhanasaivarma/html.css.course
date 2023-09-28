const express = require("express")
const api = express()
api.use(express.static('public'));
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
initializeApp({
    credential: cert(serviceAccount)
  });
const db=getFirestore();
api.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
api.get("/loginpage",(req,res)=>{
  const name=req.query.name;
  const email=req.query.email;
  const phone=req.query.phone;
  db.collection('use')
  .where("email","==",email)
  .where("name","==",name)
  .get()
  .then((docs)=>{
    if(docs.size>0){
      res.sendFile(__dirname+"/hj.html");
    }
    else{
      res.sendFile(__dirname+"/hj.html");
    }
  })
})
api.get("/signup",function(req,res){
    db.collection('use').add({
        names:req.query.fullname,
        email:req.query.email,
        password:req.query.password,
        phone:req.query.phoneno,
    }).then(()=>{
      res.sendFile(__dirname+"/login.html")
    })
})
api.listen(3005)