const OtpService = require("../services/otp-service");
const HashService = require('../services/hash-service')
const crypto = require('crypto');
const otpService = require("../services/otp-service");
const UserService = require("../services/user-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const Userdto = require("../dtos/user-dtos");



class AuthController {

    async sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Must Provide Phone Number" });
        }

        const OTP = OtpService.generateOtp();
        const ttl = 1000 * 60 * 2 //2 min
        const expires = Date.now() + ttl
        const data = `${phone}.${OTP}.${expires}`
        const HashOtp = HashService.hashOtp(data)
        console.log(crypto.randomBytes(64).toString("hex"))


        try {
            // await otpService.sendbySMS(phone, OTP)

            res.json({
                hash: `${HashOtp}.${expires}`,
                phone,
                OTP
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Failed to send OTP " })
        }



        // res.status(200).json({
        //     OTP,
        //     HashOtp
        // });


    }







    async verifyOtp(req, res) {

        const { hash, otp, phone } = req.body

        if (!hash || !otp || !phone) {
            res.status(400).json({
                message: "All Field Required"
            })
        }

        const [hashotp, expires] = hash.split(".")

        if (Date.now() > Number(expires)) {
            res.status(400).json({
                message: "Token is Expired"
            })
        }

        const data = `${phone}.${otp}.${expires}`
        const isvalid = otpService.OtpVerification(hashotp, data)
        if (!isvalid) {
            res.status(400).json({ message: "Invalid OTP" })
        }



        let user;
        // let accessToken;

        try {
            user = await userService.finduser({ phone })

            if (!user) {
                user = await userService.createUser({ phone })
            }



        } catch (error) {
            console.log(error)
        }

        //Token

        const {accessToken ,refreshToken}=tokenService.generateToken({_id:user._id,activated:false})

        await tokenService.storeRefreshToken(refreshToken,user._id)

        res.cookie("refreshToken",refreshToken,{
            maxAge:1000*60*60*24*30, //30 days
            httpOnly:true,
        })
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userdto=new Userdto(user)

        res.json({
            accessToken,user:userdto
        })
    }

}

module.exports = new AuthController();
