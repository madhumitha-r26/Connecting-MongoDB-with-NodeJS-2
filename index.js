const express=require('express')
const dotenv=require('dotenv')
const userRouter= require('./routers/userRouter')
const DbConnection = require('./DbConnection');
DbConnection();


const app=express()
const port=8081

dotenv.config()

app.use(express.json())
app.use("/users",userRouter)

//------------checking whether the route exists----------------------
app.get("*", (req, res) => {
    res.status(404).json({
        message: "route doesn't exists",
});
});


app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT-${port}`)
})