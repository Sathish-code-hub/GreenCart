import jwt from 'jsonwebtoken';

export const failedLoginAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;


// seller login : /api/seller/login
export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip;
    const now = Date.now();

    // First, check if credentials are correct
    const isValid = (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD);

    if (isValid) {
        //  Reset attempts immediately if successful login
        failedLoginAttempts.delete(ip);

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Logged In" });
    }

    //  If credentials are invalid, proceed to rate-limit check
    const attempts = failedLoginAttempts.get(ip) || [];
    const recentAttempts = attempts.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

    if (recentAttempts.length >= MAX_ATTEMPTS) {
        return res.status(429).json({
            success: false,
            message: "Too many failed login attempts. Try again after 15 minutes."
        });
    }

    //  Record failed attempt
    failedLoginAttempts.set(ip, [...recentAttempts, now]);

    return res.json({ success: false, message: "Invalid credentials" });
};



// seller is-auth : /api/seller/is-auth
export const isSellerAuth = async(req,res) => {
    try {
        return res.json({success:true, seller: req.seller})

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}


// logout seler : /api/seller/logout
export const sellerLogout = async(req,res) =>{
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({success: true, message: "Logged out"})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}
