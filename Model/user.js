const mongoose =require('mongoose');
const {ObjectId}= mongoose.Schema.Types


const userSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:'https://res.cloudinary.com/dtcqgxgzc/image/upload/v1628771643/insta-clone/nopic_t0sges.png',
    },
    followers:[{type:ObjectId,ref:'User'}],
    following:[{type:ObjectId,ref:'User'}]
    
})

mongoose.model('User', userSchema);

// module.exports = User;