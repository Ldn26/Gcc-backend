// const User = require('../sequelize/models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const signup = async (req, res) => {
//     const { name, email,password} = req.body;
// try{
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Invalid name, email or password' });
//       }
//     const userExists = await User.findOne({ where: { email } });
//     if (userExists) {
//         return res.status(400).json({ message: 'User already exists' });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({ name, email,password : hashedPassword });  
//     const { password: _, ...userWithoutPassword } = user.toJSON();
//     res.status(201).json({ user : userWithoutPassword });
// }catch{
//     res.status(400).json({ message: 'Error in creating user' });
// }}
// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!login || !password) {
//         return res.status(400).json({ error: "Invalid login or password" });
//     }
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     const validPassword = await bcrypt.compare(password, user.password);   
//     if (!validPassword) {
//         return res.status(400).json({ message: 'Invalid password' });
//     }
//     const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET ,{expiresIn: '1h'});
//     const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET , {expiresIn: '7d'}); ;
//     res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'None',maxAge: 1000 * 60 * 60 * 24 * 7 });
//     const { password: _, ...userWithoutPassword } = user.toJSON();

//     res.status(200).json({ accessToken  , user : userWithoutPassword });
    
// }

// const logout = async (req, res) => {
//     const authHeader = req.headers['authorization'];
//     console.log("Athorization header")
//     console.log(authHeader)
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }
//     const token = authHeader.split(' ')[1];
//     try{
//   jwt.verify(token, process.env.JWT_SECRET);
//   res.clearCookie('refreshToken' , { httpOnly: true , sameSite: 'None' ,secure: true});
//   res.status(200).json({ message: 'Logged out' });
//     }catch(error){
//         return res.status(403).json({ message: "Invalid or expired token" });

//     }
// }
// const refresh = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });}
//     try{
//      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//      const newAceeToken = jwt.sign({ id: User.id }, process.env.JWT_SECRET ,{expiresIn: '1h'});
//      res.status(200).json({ accessToken: newAceeToken });
//     } catch(err){
//         res.status(403).json({ message: "Invalid or expired token" });
//     } 
// }
// module.exports = {  signup,  login ,logout,refresh } 

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  const { name, email, password ,servicetype } = req.body;
  try {
    if (!name || !email || !password  || !servicetype) {
      return res
        .status(400)
        .json({ message: " u must fill all the fields " });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    res.status(400).json({ message: "Error in creating user" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();
  res.status(200)
    .json({ accessToken, refreshToken, user: userWithoutPassword });
};

// Logout
const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
 
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Refresh Token
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { signup, login, logout, refresh };
