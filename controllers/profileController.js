const User = require('../sequelize/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const profile = async (req, res) => {  
    const {id} = req.params
    try{
        const user = await User.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.status(200).json({ user : userWithoutPassword });
    }catch{
        res.status(400).json({ message: 'Error in getting user' });
    }
}


const updateProfile = async (req, res) => {
    const {name, email} = req.body;
    try{
        const user = await User.findOne({ where: { id: req.userId } });}
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        catch{
            res.status(400).json({ message: 'Error in getting user' });
        }
}