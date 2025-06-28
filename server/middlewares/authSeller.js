import jwt from 'jsonwebtoken';

const authSeller = async(req, res, next)=>{
    const sellerToken = req.cookies.sellerToken

    if (!sellerToken) {
        return res.json({success: false, message: "Not authourized"})        
    }

    try {

        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            req.seller = tokenDecode;
            next()            
        } else {
            return res.json({ success: false, message: 'Not authourized' })
        }
        

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export default authSeller;