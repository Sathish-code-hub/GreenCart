import User from "../models/user.js";


// update user cartDate : /api/cart/update;
export const updateCart = async(req,res) => {
    try {
        
        const { cartItems} = req.body;
        const userId = req.user.userId; // ✅ use decoded user ID from token

        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Cart updated"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}