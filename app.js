const express= require('express');
const path= require('path');
// const fs= require('fs');
const app= express();
const port= 80;

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


app.listen(port,()=>{
    console.log(`this application is live on the port ${port}`)
})