const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    username:String,
    password:String,
})
const user=mongoose.model("user",userschema)

const showData=async()=>{
    const x=await user.find({})
    return x;
}

const handleData=async(data)=>{
    const{username,password}=data;
    const check=await user.findOne({username:username})
    if(check){return {message: 'Data already exist'}}
    const newUser = new user({ username, password });
    await newUser.save();

  // Return a response object
    return { message: 'Data processed successfully', data: { username, password } };
}

const del=async(data)=>{
    try{
        const {username}=data
        await user.deleteOne({username:username})
        return{message:"Deletion was succesfull !!"}
    }catch(error){
        return{error}
    }
}
module.exports={handleData,showData,del};
