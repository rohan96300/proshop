import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

// @desc Auth User & get Token
// @route Post /api/users/login
// @access Public

const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else{
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Register user
// @route Post /api/users
// @access Public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout User & clear cookie
// @route get /api/users/logout
// @access Private

const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'Logged out successfully'});
});

// @desc getUser profile
// @route get /api/users/profile
// @access Public

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Update user profile
// @route put /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(201).json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc get Users
// @route get /api/users
// @access Private/admin

const getUsers = asyncHandler(async(req, res) => {
    res.send("get users");
});

// @desc get User by id
// @route GET /api/users/:id
// @access Private/admin

const getUserById = asyncHandler(async(req, res) => {
    res.send("get user by Id");
});

// @desc delete Users
// @route Delete /api/users/:id
// @access Private/admin

const deleteUser = asyncHandler(async(req, res) => {
    res.send("delete user");
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private/admin

const updateUser = asyncHandler(async(req, res) => {
    res.send("Update user");
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};
