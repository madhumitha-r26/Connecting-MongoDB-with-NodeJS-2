const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
})

const UserModel = mongoose.model('students', userSchema);
module.exports=UserModel;