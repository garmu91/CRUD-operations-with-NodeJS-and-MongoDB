//CRUD operations (Create, Read, Update, Delete)

const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();//this will return all users
    if (!users) return res.status(400).json({ 'message': 'Users not found.' });
    res.json(users);//to show all users
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "Employee ID required" });

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(400).json({ "message": `User ID ${req.body.id} not found` });

    const result = await User.deleteOne({ _id: req.body.id });//no exec() is needed, check Mongoose documentation to see which methods need exec()
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "User ID required" });

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}