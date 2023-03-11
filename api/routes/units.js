const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");

//models import

import Units from "../models/units.js";

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

router.get("/units", async (req, res) => {

    try {

        const units = await Units.find({})

        console.log(units)

        const unitsParsed = JSON.parse(JSON.stringify(units))

        const response = {
          status: "success",
          data: unitsParsed
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

router.post("/units", async (req, res) => {

    try {
        const { name, units } = req.body; // Obtener los datos del cuerpo de la solicitud

        const newUnit = new Units({ name, units }); // Crear un nuevo documento con los datos

        await newUnit.save(); // Guardar el nuevo documento en la base de datos

        const response = {
          status: "success",
          message: "New unit added successfully"
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
