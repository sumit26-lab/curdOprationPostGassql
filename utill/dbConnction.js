const {Client} =require('pg')

const db= new Client({
    port:5432,
    user:'postgres',
    host:'localhost',
    database:"testpost",
    password: "12345"
})
db.connect().then(()=>console.log('data base Connected')).catch(error=>{
    console.log(`database Connetion faled`,error)
})
module.exports=db