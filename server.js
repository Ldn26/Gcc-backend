require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const authrouter = require('./routes/authroute');
// const cors = require('cors');
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
// app.use("/api/auth", authrouter);

app.use("/api/users", authrouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












// const app = express();
// app.use(express.json());  //middleware to parse json data
// app.use(cookieParser());
// app.use(cors()); // middleware to allow cross origin requests




// app.use('*',(req , res)=>{
//     res.status(404).json({
//         status : 'fail',
//         message :' route  not found'
//     })
// });



// app.use(credentials);
// app.use(cors(corsOptions));
// Initialize database connection and synchronize models
// connect()
// // sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         // return sequelize.sync({ force: false, alter: true });
//     })
//     .then(() => {
//         console.log('Database synchronized');
//         // Start the server after database synchronization
//         const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

