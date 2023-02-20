const express = require('express');
const Router = express.Router();
const homeschema = require('../models/homeschema')

Router.get('',(req,res) =>{
    res.render('logreg',{title : "tarun raj singh", name: "jai ho", password: '', email: ''})
})
Router.get('/ind',(req,res)=>{
    res.render('main',{title : "tarun raj singh", name: "jai ho", password: 'jaiho jaiho', email: ''})
})

// REGISTRATION //


Router.post('/registeruser',async(req,res)=>{
    try{
        const {
            UserName,
            EmailId,
            password,
            cpassword
        } = req.body;

        if(password === cpassword){
            const Userdata = new homeschema({
                name: UserName,
                email: EmailId,
                password: password
            })
            Userdata.save(err=>{
                if(err){
                    console.log("error!!!")
                }
                else{
                    res.render('logreg',{title : "", name: "", password: 'Registered Successfully', email: ''})
                }
            })
            const useremail = await homeschema.findOne({email: EmailId})
            if(EmailId === useremail.email)
            {
                res.render('logreg',{title : "", name: "", password: '', email: 'Email Already Exists! try another!'})
            }
            else 
            {
                console.log("error")
            }
        }
        else{
            res.render('logreg',{title : "", name: "", password: 'Password do not match', email: ''})
        }
    }
    catch(error){
        res.render('logreg',{title : "error in code", name: "jai ho", password: '', email: ''})
    }
})




//  SIGN IN // 

Router.post('/login',(req,res)=>{
    const {
        EmailId,
        UserName,
        password,
    } = req.body;

    homeschema.findOne({email:EmailId},(err,result)=>{
        // console.log(result);
        if(EmailId === result.email && password === result.password)
            {
                // console.log("success");
                res.render('dashboard1',{name : result.name})
            }
        else{
            if(password != result.password)
                {
                    res.render('logreg',{title : "", name: "", password: 'wrong password', email: ''})
                }
            console.log(err);
        }
    })
})

module.exports = Router;