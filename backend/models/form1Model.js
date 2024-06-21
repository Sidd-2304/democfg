const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({

    
    name: {
        type: String,
        // required: true
    },
    designation: {
        type: String,
        // required: true
    },
    socialProfile: {
        type: String,
        // required: true
    }
});

const CompanySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    name: {
        type: String,
        // required: true,
        unique: true
    },
    domain: {
       type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true,
        // minlength: 50
    },
    address: {
        street: {
            type: String,
            // required: true
        },
        landmark: {
            type: String,
            // required: true
        },
        pinCode: {
            type: String,
            // required: true
        },
    },
    logo: {
        type: String, // Assuming the logo will be stored as a URL
        // required: true
    },
    skillset: {
        type: [String], // An array of strings to store multiple skills
        // required: true
    },
    teamMembers: {
        type: [TeamMemberSchema], // An array of TeamMember subdocuments
        default: [] // Default to an empty array
    }
});

module.exports = mongoose.model('Company', CompanySchema);
