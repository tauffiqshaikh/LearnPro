import express from "express";
import {register, login} from '../controllers/auth.js';

const route = express.Router();

route.post('/register', register );
route.post('/login', login );

module.exports = route;