const express= require('express');
const path= require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
// const fs= require('fs');
const bodyParser =require('body-parser');
const app= express();
const port= 80;

//mongoose
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var Contact = mongoose.model('contact', contactSchema);

//express stuff
app.use('/static',express.static('static' )) //for serving static files
app.use(express.urlencoded());

//pug stuff
app.set('view engine', 'pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});
// app.get('/location',(req,res)=>{
//     const params={};
//     res.status(200).render('location.pug',params);
// });


app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item was saved to the database");
    }).catch(()=>{
        res.status(400).send("Item is not saved to the database");
    });
    // res.status(200).render('contact.pug');
});

app.listen(port,()=>{
    console.log(`this application is live on the port ${port}`)
})