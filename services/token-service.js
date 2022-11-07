const jwt = require('jsonwebtoken')
const refreshTokenModel = require('../models/refresh-token-model')

const JWT_SECRET="dddd4c6c97f2a95de0c1d6f6c6c0372f80ab1fd2d8bddbd475f600fb005ebf30be2e11793b62a67ab4192ef09d7f"
const JWT_REFRESH_SECRET="d10e002607405dddd4c6c97f2a95de0c1d6f6c6c0372f80ab1fd2d8bddbd475f600fb005ebf30be2e11793b62a67ab419"
class TokenService {

    generateToken(payload) {
        const accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h"
        })

        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: "1y"
        })




        return { refreshToken, accessToken }
    }

    async storeRefreshToken(token,userId){
        try {
            await refreshTokenModel.create({
                token,
                userId
            })
        } catch (error) {
            console.log(error)
        }
    }





}

module.exports = new TokenService()