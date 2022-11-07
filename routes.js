const router=require('express').Router()
const ActivateController = require('./controllers/activate-controller')
const AuthController=require('./controllers/auth-controller')
const authMiddleware = require('./middleware/auth-middleware')

router.post("/api/send-otp",AuthController.sendOtp)
router.post("/api/verify-otp",AuthController.verifyOtp)
router.post("/api/activate",authMiddleware,ActivateController.activateuser)


module.exports=router