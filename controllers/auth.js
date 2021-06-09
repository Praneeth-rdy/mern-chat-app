const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (request, response, next) => {
    const { username, email, password } = request.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, response);
    } catch (error) {
        next(error);
    }
};

exports.login = async (request, response, next) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("password");

        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, response);

    } catch (error) {
        next(error);
    }

};

exports.forgotPassword = async (request, response, next) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;
        
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            response.status(200).json({ success: true, data: "Email Sent" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500))
        }

    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (request, response, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(request.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        user.password = request.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        response.status(201).json({
            success: true,
            data: 'Password Reset Success'
        });
    } catch (error) {
        next(error);
    }
};


const sendToken = (user, statusCode, response) => {
    const token = user.getSignedToken();
    response.status(statusCode).json({ success: true, token });
}