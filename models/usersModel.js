const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est requis"],
    },
    firstname: {
        type: String,
        required: [true, "Le prénom est requis"],
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: [true, "Le mot de passe est requis"],
    },
    role: {
        type: String,
        default: "user",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

function getPassword(){
    return UserModel.password
}

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
