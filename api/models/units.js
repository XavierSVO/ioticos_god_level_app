import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const unitsSchema = new Schema({
    name: { type: String, unique: true, required: [true], },
    units: { type: Array, required: [true] }
});

// Validator
unitsSchema.plugin(uniqueValidator, { message: 'Error, device already exists.' });

// Schema to model.
const Units = mongoose.model('units', unitsSchema);

export default Units;