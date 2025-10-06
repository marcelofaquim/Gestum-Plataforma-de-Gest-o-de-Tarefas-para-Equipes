import mongoose from "mongoose";

//Criamos as regras do usuario
const userSchemas = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // campo obrigatorio
        },
        
        email: {
            type: String,
            required: true,
            unique: true, //Não permite emails duplicados
        },

        password: {
            type: String,
            required: true,
        },
    });

    const User = mongoose.model("User", userSchemas);


export default User;