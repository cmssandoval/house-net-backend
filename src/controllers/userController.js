import UserModel from '../models/UserModel.js';

/** @type {import('express').RequestHandler} */
const readUsers = async ( req, res ) => {
    const users = await UserModel.findAll();
    return res.json(users);
};

/** @type {import('express').RequestHandler} */
const readUserById = async ( req, res ) => {
    const { id } = req.params;
    const response = await UserModel.findById(id);
    return res.json(response);
};

/** @type {import('express').RequestHandler} */
const createUser = async ( req, res ) => {
    const user = req.body;
    const response = await UserModel.create({ user });
    return res.json({response});
};

/** @type {import('express').RequestHandler} */
const replaceUser = async ( req, res ) => {
    const newUserData = req.body;
    const response = await UserModel.update({ newUserData });
    return res.json({response});
};

/** @type {import('express').RequestHandler} */
const deleteUser = async ( req, res ) => {
    const { id } = req.params;
    const response = await UserModel.delete( id );
    return res.json();
};

const userController = {
    readUsers,
    readUserById,
    createUser,
    replaceUser,
    deleteUser,
};

export default userController;
