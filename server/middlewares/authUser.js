import jwt from 'jsonwebtoken'


const authUser = async(req,res,next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message: "Not authourized"})
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
           req.user = { userId: tokenDecode.id };  // ✅ FIXED: attach safely            
        }else{
            return res.json({success:false, message: 'Not authourized'})
        }
        next()
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}

export default authUser;