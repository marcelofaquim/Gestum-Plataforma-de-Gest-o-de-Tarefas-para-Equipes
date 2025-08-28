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
    },

    {
        timestamps: true, //cria automaticamente creadAt e updateAt
    }
);

export default mongoose.model("User", userSchemas);