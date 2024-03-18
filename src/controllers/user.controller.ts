import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models/user";
import jwt from 'jsonwebtoken';
export const newUser = async (req:Request, res:Response) => {
    
    const {username , password} = req.body; 
    //Validate if the user alredy exist
    const user = await User.findOne({where: {username: username}});

    if(user){
        return res.status(400).json({
            msg: `El usuario ${username} ya se encuentra registrado!`
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username: username,
            password: hashedPassword
        })    
        res.json({
            msg: `Usuario ${username}  creado exitosamente`
            
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps Ocurrio un error',
            error
        })
        
    }
    
    
}

export const login= async(req:Request, res:Response) => {
    
    const {username, password} = req.body;
    //Validate if the user exist
    const user: any = await User.findOne({where: {username: username}});

    if(!user){
        return res.status(400).json({
            msg: `No existe el usuario ${username}`
        })
    }
    //Validate if the password is correct
    
    const passwordValid = await bcrypt.compare(password,user.password)
        
    if(!passwordValid){
        return res.status(400).json({
            msg: 'Contraseña Incorrecta'
        })
    }
    
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'ANGULAR123', {
        expiresIn: '1h' // Ejemplo de expiración de 1 hora
    });
    console.log(token);
    res.json(token);
}