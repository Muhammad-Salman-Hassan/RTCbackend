module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies;
        console.log(accessToken)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};