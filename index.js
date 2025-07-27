const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())



mongoose.connect('mongodb://127.0.0.1:27017/library')
.then((res)=>console.log("connected mongoDB"))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.static("public"))

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    author: String,
    year: Number
})

const Products = mongoose.model("Library", ProductSchema)



app.get("/products", async (req, res)=>{
    
    let {page = 1, take= 10, name, author, price, year } = req.query
    let skip = (page- 1) * take
    
    let filter = {}
    if (name) filter.name = name 
    if (price) filter.price = price
    if (author) filter.author = author
    if (year) filter.year = year

   try{
        let prods = await Products.find(filter).skip(skip).limit(take)
        res.status(200).send(prods)
   }catch(e){(res.status(400).send(e))}
   
})
app.get("/products/:id", async(req, res)=>{
    try{
    let {id}=req.params
    let single = await Products.findById(id)
    res.status(200).send(single)
    }catch(e){(res.status(400).send(e))}
})
app.post("/products", async (req, res)=>{
    try{
        let data = req.body
        let newPrd = new Products(data)
        await newPrd.save()
        res.status(200).send(newPrd)
    }catch(e){res.status(400).send(e)}
})

app.patch("/products/:id", async (req, res)=>{
   try{
        let data = req.body
        let {id} = req.params
        let newChange = await Products.findByIdAndUpdate(id, data, {new: true})
        res.status(200).send(newChange)
   }catch(e){res.status(400).send(e)}
})

app.delete("/products/:id", async (req, res)=>{
    try{
        let {id} = req.params
        let prdDel = await Products.findByIdAndDelete(id)
        res.status(200).send(prdDel)
    }catch(e){res.status(400).send(e)}
})


app.listen(3000, ()=>{
    console.log("server started on 3000 port");
    
})

//mongosh
//use n24
// db.tovars.deleteMany({})
// db.tovars.find()
