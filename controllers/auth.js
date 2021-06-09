const User = require('../models/User');



exports.register = async (request, response, next) => {
    const { username, email, password } = request.body;

    try {
        const user = await User.create({
            username, email, password
        });

        response.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (request, response, next) => {
    const { email, password } = request.body;

    if (!email || !password) {
        response.status(400).json({
            success: false,
            error: "Please provide email and password"
        });
    }

    try {
        const user = await User.findOne({ email }).select("password");

        if (!user) {
            response.status(404).json({
                success: false,
                error: "Invalid Credentials"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            response.status(404).json({
                success: false,
                error: "Invalid Credentials"
            });
        }

        response.status(200).json({
            success: true,
            token: "sdstesdhjsd",
        })

    } catch (error) {
        response.status(500).json({
            success: false,
            error: error.message,
        })
    }

    response.send("Login Route");
};

exports.forgotPassword = (request, response, next) => {
    response.send("Forgot Password Route");
};

exports.resetPassword = (request, response, next) => {
    response.send("Reset Password Route");
};