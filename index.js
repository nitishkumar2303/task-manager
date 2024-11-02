const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.set('view engine' , 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname ,"public")));

app.get('/' ,(req,res)=>{

    fs.readdir(`./files` , (err,files)=>{
        res.render("index", {files:files});
    })
    
})

app.get('/file/:fileName' ,(req,res)=>{

    fs.readFile(`./files/${req.params.fileName}`  ,"utf-8" , (err,data)=>{
        // res.render("file" , {data:data});
        console.log(data);
        res.render("show", {filename:req.params.fileName , data:data});
    })
    
})


app.post('/create' ,(req,res)=>{
    console.log(req.body);

    fs.writeFile(`./files/${req.body.title.split(" ").join("-")}.txt` , req.body.details  , (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
    
})

app.listen(3000 , ()=>{
    console.log("your server is started");
})