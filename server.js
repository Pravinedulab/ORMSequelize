const express = require('express');
const Sequelize = require('sequelize');
const Data = require('./data');

const app = express();
const port= 8001;

const connection = new Sequelize('cartdb','root','password',{
    dialect:'mysql'
})

const User = connection.define('Users',{
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    company: Sequelize.STRING,
    address: Sequelize.STRING
    });

    const Post = connection.define('Posts',{
            title: Sequelize.STRING,
            decription: Sequelize.STRING     
        });

        User.hasOne(Post);
      
    connection
    .authenticate()    
    .then(() => {
        console.log('Connection to database established successfully.');
    })
        .catch(err =>{
            console.error('Unable to connect the database');
        });        
        
    connection 
    .sync({
        logging:console.log,
        force: true
    })
    .then(() => {
        console.log('Connection to database established successfully.');
        app.listen (port,() => {
            console.log('Running server on port' + port);
        });
    })
    .then(() =>{
    User.bulkCreate(Data)
    .then(() => {
        console.log('user inserted successfully');
    })
    .catch(error =>{
        console.log(error);
    })
})
.then(() =>{
Post.create ({
    UserID:1,
    title: "Sequelize.STRING",
    decription: "Sequelize.STRING" ,
    
})
})
    
    
     .catch(err =>{
        console.error('Unable to connect the database:',err);
     } );