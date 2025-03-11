// app.js  
const express = require('express');  
const { Sequelize, DataTypes } = require('sequelize');  

const app = express();  
const port = 3000;  

// Database configuration  
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {  
  host: 'localhost',  
  dialect: 'mysql'  
});  

// Define the User model  
const User = sequelize.define('User', {  
  id: {  
    type: DataTypes.INTEGER,  
    primaryKey: true,  
    autoIncrement: true  
  },  
  name: {  
    type: DataTypes.STRING,  
    allowNull: false  
  },  
  email: {  
    type: DataTypes.STRING,  
    allowNull: false,  
    unique: true  
  },  
  status: {  
    type: DataTypes.STRING,  
    defaultValue: 'active'  
  }  
}, {  
  tableName: 'users', 
  timestamps: false  
});  

// Define the /users route  
app.get('/users', async (req, res) => {  
  try {  
    const users = await User.findAll();  
    res.json(users);  
  } catch (error) {  
    console.error('Failed to fetch users:', error);  
    res.status(500).json({ error: 'Failed to fetch users' });  
  }  
});  

// Start the server  
sequelize.sync() 
  .then(() => {  
    app.listen(port, () => {  
      console.log(Server is running on port ${port});  
    });  
  })  
  .catch(err => {  
    console.error('Unable to connect to the database:', err);  
  });