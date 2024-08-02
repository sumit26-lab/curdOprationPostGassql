const express= require('express')
const app= express()
const bodyparser= require('body-parser')
const db= require('./utill/dbConnction')
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs')

app.post('/adduser',async(req,res)=>{
    const { firstname, lastname } = req.body;
     const adduser= await db.query('insert into "user"(firstname,lastname) values( $1 ,$2)',[firstname,lastname])
     console.log("user-add",adduser.rows)
    res.redirect('/')
})
app.get('/',async(req,res)=>{
    console.log("api hits")
   let user= await db.query('select * from "user"')
   let data= user.rows
      
      res.render('index.ejs',data={data})

})
app.get('/deleted/:id',async(req,res)=>{
    let id=req.params.id
    let user = await db.query('delete from "user" where id=$1',[id])
    console.log(user.rows)
    res.redirect('/')
})
app.get('/edit/:id',async(req,res)=>{
    let id=req.params.id
    let data = await db.query('select * from "user" where id=$1',[id])
    let user= data.rows[0]
    console.log(user)
    res.render('edit',user={user})
})
app.post('/UserUpadte/:id',async(req,res)=>{
   
    let id=req.params.id;
    const { firstname, lastname } = req.body;
    let upadteUser= await db.query('update "user" set firstname=$1, lastname=$2 where id =$3',[firstname,lastname,id])
     let user =await upadteUser.rows
     res.redirect('/')
})
app.listen(3000,()=>{
    console.log('Server will start on 4000')
})