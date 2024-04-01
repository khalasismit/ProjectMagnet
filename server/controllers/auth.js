import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import nodemailer from "nodemailer"
// user
export const continueWithGoogle = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            const newUser = new User({
                firstName,
                lastName,
                userName,
                dob,
                bio,
                location,
                picturePath,
                email,
                status,
                followers,
                following,
                followRequest,
                sentRequest,
                posts,
                savedPosts,
            });
            await newUser.save();
            const user = await User.findOne({ email: newUser.email })
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
            // console.log("Contine with google user created and continue")
            // delete user.password;
        } else {
            console.log("Contine with google email already exist ")
            // const user = await User.findOne({ email: email });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
        }
    } catch (err) {
        console.log("Server error")
        res.status(500).json("Error");
    }
}
// admin
export const continueWithGoogleAdmin = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body;

        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            const newAdmin = new Admin({
                firstName,
                lastName,
                userName,
                dob,
                bio,
                location,
                picturePath,
                email,
                status,
                followers,
                following,
                followRequest,
                sentRequest,
                posts,
                savedPosts,
            });
            await newAdmin.save();
            const admin = await Admin.findOne({ email: newAdmin.email })
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
            return res.status(200).json({ admin, token });
            // console.log("Contine with google user created and continue")
            // delete user.password;
        } else {
            console.log("Contine with google email already exist ")
            // const user = await User.findOne({ email: email });
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
            return res.status(200).json({ admin, token });
        }
    } catch (err) {
        console.log("Server error")
        res.status(500).json("Error");
    }
}

/* REGISTER USER */
export const signup = async (req, res) => {
    try {
        // console.log(req.body.values)
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body;
        console.log(firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts)
        let saltRound = 10;
        let hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new User({
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password: hashedPassword,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json("Error");
    }
};

// admin signup
export const signupAdmin = async (req, res) => {
    try {
        // console.log(req.body.values)
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body

        let saltRound = 10;
        let hashedPassword = await bcrypt.hash(password, saltRound);
        const newAdmin = new Admin({
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password: hashedPassword,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(500).json("Error");
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("Invalid User");
            return res.status(400).json("Error");
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid Password");
            return res.status(400).json("Error");
        };
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            delete user.password;
            return res.status(200).json({ user, token });
        }
    } catch (err) {
        res.status(500).json("Error");
    }
};

// admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            console.log("Invalid admin");
            return res.status(400).json("Error");
        };
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("Invalid Password");
            return res.status(400).json("Error");
        };
        if (isMatch) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
            delete admin.password;
            console.log("Admin login success", admin, token)
            return res.status(200).json({ admin, token });
        }
    } catch (err) {
        res.status(500).json("Error");
    }
};

export const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            res.status(400).json("user doesn't exist");
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'RESET PASSWORD LINK',
                // html: `<h1> Hi ${user.userName},</h1>
                // <p>
                // There was a request to change your password!
                // </p>
                // <p>
                // If you did not make this request then contact our MAGNET TEAM for report.
                // </p>
                // <p>            
                // Otherwise, please click this link to change your password: <a href="
                // http://localhost:3000/reset-password/${token}"></a>
                // </p>`
                html: `<div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h4 style="color: #333;">Hello ${user.userName},</h4>
                <p style="color: #666;">Somebody requested a new password for the magnet account associated with ${email}.</p>
                <p style="color: #666;">No changes have been made to your account yet.</p>
                <p style="color: #666;">You can reset your password by clicking the link below:</p>
                <a href="http://localhost:3000/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">http://localhost:3000/reset-password/${token}</a>
                <p style="color: #666;">If you did not request a new password, please let us know immediately by replying to this email.</p>
                <div style="margin-top: 20px; color: #999;">
                    <p>Yours,</p>
                    <p>The Team at Magnet</p>
                </div>
            </div>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(400).json("email not found")
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json("Success")
                }
            });
        }
    } catch (err) {
        res.status(500).json("server Err");
    }
}

export const resetpassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        let saltRound = 10;
        let hashedPassword = await bcrypt.hash(password, saltRound);
        await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
        res.status(200).json("Password updated successfully")
    } catch (err) {
        res.status(500).json("server Err");
    }
}