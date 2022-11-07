const crypto = require('crypto')
const hashServie=require("./hash-service")

const twilio = require('twilio')("ACa15495cb07dd6b960ce423a8a489c02a", "3ae3bf1d805072a1d72bccd79d36e8e2")

class OtpService {
    generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendbySMS(phone, OTP) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your codershouse OTP is ${OTP}`,
        });



    }

    OtpVerification(hashotp,data){
        const computedhash=hashServie.hashOtp(data)
        return computedhash===hashotp
       
    }
}

module.exports = new OtpService()