const User=require('../models/user-model')
class UserService{


    async finduser(query){

        const user=await User.findOne(query);
        return user
    }

    async createUser(data){
        const user=await User.create(data)
        return user
    }

}


module.exports=new UserService()