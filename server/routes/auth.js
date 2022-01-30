import express from "express";

const route = express.Router();

//controllers
import {register,login,logout} from '../controllers/auth' 

route.post('/register', register );
route.post('/login', login );
route.get('/logout', logout );

module.exports = route;