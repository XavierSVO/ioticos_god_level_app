const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkAuth } = require("../middlewares/authentication.js");

//models import
import User from "../models/user.js";
import EmqxAuthRule from "../models/emqx_auth.js";

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

router.get("/login", async (req, res) => {

    try {
        const response = {
          status: "success",
          data: {unidades:['unidades']}
        };
    
        return res.json(response);
    } catch (error) {
        
    }
})