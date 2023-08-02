
import jwt from 'jsonwebtoken'

import {TOKEN_SECRET} from '../config.js'// estamo trayendo la clave secreta del token



//Creamos esta funcion para que el token se puede reperit y ejecutar en nuestra appweb

export function createAccessToken(payload) {

   return new Promise((res,req) =>{
    jwt.sign(payload,TOKEN_SECRET,{expiresIn:"1d"},
        (err,token) =>{
            if(err) req(err);
            res(token);
        }
    
    )
   })

}

    
    