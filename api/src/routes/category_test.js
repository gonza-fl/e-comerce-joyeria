const express = require('express');
const server = require("express").Router();
const {Category} = require("../models/index")

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.post('/', function(req,res){
    const name = req.query.name
    const description = req.query.description

    //const {name,description} = req.body

    if(name==undefined || name.trim().length==0){
        return res.json({err:"El nombre de la categoria no puede ser vacia"})
    }
    if(description==undefined || description.trim().length==0){
        return res.json({err:"La descripcion no puede ser vacia"})
    }

    //return res.json({success:"Esta entrando aqui"})
    Category.create({name,description})
        .then((obj)=>{
            return res.json({success:"La categoria ha sido creada!"})
        })
});

module.exports = server;