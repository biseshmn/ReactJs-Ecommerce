const User = require('../models/authModel')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const sendEmail = require('../utils/setEmail')
const jwt = require('jsonwebtoken') //authentication
const { expressjwt } = require('express-jwt') //authorization

// post/create user
exports.postUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    })

    // to check if email already exists
    User.findOne({ email: user.email })
        .then(async data => {
            if (data) {
                return res.status(400).json({ error: 'email must be unique' })
            }
            else {
                user = await user.save()
                if (!user) {
                    return res.status(400).json({ error: 'something went wrong' })
                }


                let token = new Token({
                    token: crypto.randomBytes(16).toString('hex'),
                    userId: user._id
                })
                token = await token.save()
                if (!token) {
                    return res.status(400).json({ error: 'failed to create token' })
                }


                //send Email process
                const url = process.env.FRONTEND_URL+'\/email\/confirmation\/'+token.token
                //localhost:3000/email/confirmation/token

                sendEmail({
                    form: 'no-reply@expresscommerce.com',
                    to: user.email,
                    subject: 'Email Verification Link',
                    text: `Hello, \n\n 
                          Please verify your email by clicking the link below: \n\n
                          http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
                    html:`<center><h2>Verify Your Email Account</h2></center> 
                            <center><h4> <a href="${url}"> Click to verify </a> </h4></center> `
                })


                res.send(user)
            }
        })

        .catch(err => {
            return res.status(400).json({ error: err })
        })
}


// confirming the email
exports.postEmailConfirmation = (req, res) => {
    // at first, find the valid or matching
    Token.findOne({ token: req.params.token })

        .then(token => {
            if (!token) {
                return res.status(400).json({ error: 'invalid token or token may have expired' })
            }

            //if we find the valid token, then find the valid user for that token
            User.findOne({ _id: token.userId })
                .then(user => {
                    if (!user) {
                        return res.status(400).json({ error: 'unable to find the valid user for this token' })
                    }

                    //check if user is already verified
                    if (user.isVerified) {
                        return res.status(400).json({ error: 'email is already verified, log in to continue' })
                    }

                    //save the user if verified
                    user.isVerified = true
                    user.save()
                        .then(user => {
                            if (!user) {
                                return res.status(400).json({ error: 'failed to verify your email' })
                            }
                            res.json({ message: 'Your email has been verified successfully' })
                        })

                        .catch(err => {
                            return res.status(400).json({ error: err })
                        })
                })

                .catch(err => {
                    return res.status(400).json({ error: err })
                })
        })

        .catch(err => {
            return res.status(400).json({ error: err })
        })
}



// show users list
exports.userList = async (req, res) => {
    const user = await User.find().sort({ createdAt: -1 })
        .select('-hashed_password')
        .select('-salt')

    if (!user) {
        return res.status(400).json({ message: 'nothing to show' })
    }
    res.send(user)
}



// show user detail
exports.userDetail = async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-hashed_password')
        .select('-salt')

    if (!user) {
        return res.status(400).json({ error: 'user not found' })
    }
    res.send(user)
}



// update a user
exports.userUpdate = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,

        {
            name: req.body.name,
            email: req.body.email
        },

        { new: true }
    )

    if (!user) {
        return res.status(400).json({ message: 'cannot update user' })
    }
    res.send(user)
}



// delete a user
exports.userDelete = (req, res) => {
    User.findByIdAndDelete(req.params.id)

        .then(user => {
            if (!user) {
                return res.status(403), json({ error: 'specified user not found' })
            }
            else {
                return res.status(200).json({ message: `${user.name} deleted` })
            }
        })

        .catch(err => {
            return res.status(400).json({ error: 'user already deleted or does not exist' })
        })
}



//sign in process
exports.signIn = async (req, res) => {
    const { email, password } = req.body

    // at first
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: 'the email you provided does not exist in our system, please try another' })
    }

    // if email found then check password
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: 'email or password does not match' })
    }


    //check is user is verified or not
    if (!user.isVerified) {
        // const user = User.findOne({email})
        User.findOne({ email: user.email })
            .then(async user => {

                let token = new Token({
                    token: crypto.randomBytes(16).toString('hex'),
                    userId: user._id
                })
                token = await token.save()

                if (!token) {
                    return res.status(400).json({ error: 'failed to create token' })
                }

                //send Email process
                const url = process.env.FRONTEND_URL+'\/confirmation\/'+token.token
                //localhost:3000/confirmation/token

                //send Email process
                sendEmail({
                    form: 'no-reply@expresscommerce.com',
                    to: user.email,
                    subject: 'Email Verification Link',
                    text: `Hello, \n\n 
                      This is a new verification link. Please verify your email by clicking the link below: \n\n
                      http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
                    html:`<center><h2>Verify Your Email Account</h2></center> 
                            <center><h4> <a href="${url}"> Click to verify </a> </h4></center> `
                })
            })

            .catch(err => {
                return res.status(400).json({ error: err })
            })


        return res.status(400).json({ error: 'Check your email for new verification link' })

    }//if!user.isVerified


    //now generate token with user id and jwtsecret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    //store token in the cookie
    res.cookie('myCookie', token, { expire: Date.now() + 999999 })
    //return user info to frontend
    const { _id, name, role } = user


    return res.json({ token, user: { name, email, _id, role } })
}//signIn



//forget password
exports.forgetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: 'sorry to email you provided not found in our system' })
    }

    let token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
    })
    token = await token.save()

    if (!token) {
        return res.status(400).json({ error: 'unable to create token' })
    }

    //send Email process
    const url = process.env.FRONTEND_URL + '\/resetpassword\/' +token.token
    //localhost:3000/resetpassword/confirmation/token

    sendEmail({
        form: 'no-reply@expresscommerce.com',
        to: user.email,
        subject: 'Password reset link',
        text: `Hello, \n\n 
                Please click below link to reset password: \n\n
                http:\/\/${req.headers.host}\/resetpassword\/${token.token}`,
        html:`<h1>Reset password link</h1> <a href="${url}"> Click to verify </a>`
    })

    res.json({ message: 'Password reset link has been sent to you email' })
}


//reset password
exports.resetPassword = async (req, res) => {
    //find the valid token
    const token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: 'Token already expired' })
    }

    //if token found then validate user for that token
    let user = await User.findOne({ _id: token.userId })
    if (!user) {
        return res.status(400).json({ error: 'User not found' })
    }

    user.password = req.body.password

    user = await user.save()
    if (!user) {
        return res.status(500).json({ error: 'Failed to reset password' })
    }

    res.json({ message: 'password has been reset successfully, please login to continue' })
}



//require sign in
exports.requireSingin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})


//sing out
exports.signOut = (req,res) =>{
    res.clearCookie('myCookie')
    res.json({message:'sign out success'})
}