import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Registar novo usuario
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        //Verificar se o usuario já existe

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuario já existe"});
        }

        //criptografia da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        //criar um novo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Usuario registrado com sucesso", user: newUser});
    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar o usuario", error });
    }

};

    //Login do usuario
    export const login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json ({ message: "Email e senha são obrigatorios"});

            //Verificar se o usuario existe
            const user = await User.findOne ({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuario não encontrado" });

            }

            //Compara a senha
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(401).json({ message: "Credenciais invalidas" });
            }

            //Gerar o token JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            return res.status(200).json({ message: 
                "Login realizado com sucesso", token, 
                user: { _id: user._id, name: user.name, email: user.email }
            });

        } catch (error) {
            console.error({ message: "Erro no login" , error});
            return res.status(500).json({ message: "Error interno do servidor"});
        }
    };
