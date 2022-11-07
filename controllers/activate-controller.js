class ActivateController{

    async activateuser(req,res){
        res.json({message:"ok"})
    }
}

module.exports=new ActivateController()