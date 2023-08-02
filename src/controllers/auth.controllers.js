//vamos acreare funciones que nos permiten procesar peticiones para asi conectarlas a las rutas, ademas interactua con la base de datos 

import User from '../models/user.models.js';//importamos el modelo user.models. para traer el schema del user...
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';// Bcryptjs es una biblioteca de JavaScript que facilita la generación de hashes bcrypt y la verificación de contraseñas de forma segura en aplicaciones web o cualquier otro entorno donde se necesite almacenar contraseñas de manera segura.
import {createAccessToken} from '../libs/jwt.js';// la libreria paara crear token de confirmacion para el navegador y login





import { TOKEN_SECRET } from '../config.js';


export const register = async(req, res) => {
    const {username,email,password} = req.body//capturamos los datos que valla ingresando el usuarion desde el req.boy y gracias al schema que tenemos
    //creamos un nuevo usuario que en realidad nos crea un nuevo objero para asi tener los datos mas compactos
    try {

        const userFound = await User.findOne({email});
        if(userFound){ 
            return res.status(400).json(["EL emaiil ya existe"]);
        
        }


        const passwordHash = await bcrypt.hash(password,10)//nos da un string aleatorio


        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        const userSaved= await newUser.save();//el await es para enviarlo al servidor
        const token = await createAccessToken({id: userSaved._id})
        
        res.cookie('token',token);
            res.json({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            })   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    ;

};//el registro de usuario




export const login = async(req, res) => {
    const {email,password} = req.body//para el login solo capturamos el email y password
    try {

        const userFound = await User.findOne({email});
            if(!userFound) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, userFound.password);//se realiza la comparacion de las contraseñas con el usuari registra ya 
            if(!isMatch) return res.status(404).json({message: 'incorrect password'});
        const token = await createAccessToken({id:userFound._id});



        
        res.cookie('token',token);
            res.json({
                id:userFound._id,
                username:userFound.username,
                email:userFound.email,
                createdAt:userFound.createdAt,
                updatedAt:userFound.updatedAt,
            })   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    ;

};//el inicio de sesion 


export const logout = (req, res) => {
    res.cookie('token', "", { expires:new Date(0)})
    return res.sendStatus(200);
}// el cierre de sesion



export const profile = async(req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};//validar al usuario para diligirlo a la ruta segura



export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };