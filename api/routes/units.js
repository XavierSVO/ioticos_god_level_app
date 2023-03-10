const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkAuth } = require("../middlewares/authentication.js");

//models import

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

router.get("/units", checkAuth, async (req, res) => {

    try {
        const response = {
          status: "success",
          data: {unidades:['unidades']}
        };
    
        return res.json(response);
    } catch (error) {
        console.log(error);

        const response = {
          status: "error",
          error: error
        };
    
        return res.status(500).json(response);
    }
})

module.exports = router;
