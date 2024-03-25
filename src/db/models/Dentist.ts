import mongoose from "mongoose";

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    areaOfExpertise: {
        type: String,
        required: [true, 'Please add an area of expertise']
    }}
);

const Dentist = mongoose.models.Dentist || mongoose.model('Dentist', DentistSchema);
export default Dentist;