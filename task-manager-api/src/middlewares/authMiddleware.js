// src/moddlewares/authMiddleware.js

//---------------------------
// Middleware de autenticação por JWT
// - LÊ o token do header "Authorization: Bearer <token>"
// - (opcional) aceita também x-acess-token, query ?token= e body { Token }
// - Valida o token com JWT_SECRET do .env
// - Anexa o usuario (id) em req.user ára os proximas camadas

// ---------------------------------

// Carreha as variaveis do .env automaticamente ao impotar o arquivo
import "dotenv/config";

//Biblioteca para assinar e validar tokens JWT
import jwt from "jsonwebtoken";

/**
 * Função utilitarios que tenta extrair o token vindo de 
 * diferentes lugares do request (header, query, body, cookie).
 *  ->Você só precisa do "Authorization: Bearer <token>" no Postman.
 *  os outros pontos são conveniencias para testes
 */

function getTokenFromRequest(req) {
    // 1) Padrão mais comum: Authrorization: Bearer <token>
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && typeof authHeader === "string") {
        //divide por espaço
        const [scheme, token] = authHeader.trim().split(/\s+/);
        if (scheme?.toLowerCase() === "bearer" && token) return token;
    }

    // 2) Header alternativo usado em algunns projetos: x-acess-token
    if (req.headers["x-access-token"]) return req.headers["x-access-token"]

    // 3) Query string: GET /rota?token=abc
    if (req.query?.token) return req.query.token;

    // 4) Body (JSON): { " token": "abc"} - útil em testes
    if (req.body?.token) return req.body.token;

    // 5) Cookies (se você usar cookie-parser no app): req.cookies.token
    //    -> só funcionará se você instalar e usar o cookie-parser.
    if (req.cookie?.token) return req.cookies.token;

    //Nada encontrado
    return null
}

/**
 * Middleware principal.
 * Usa next para liberar a requisão quando o token é valido
 * ou retorna 401/403 quando é invalido ou ausente
 */

export default function authMiddleware(req, res, next) {
    //Vai garantir que a aplicação foi configurada com JWT_SECRET
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message:
            "configuração ausente: defina o JWT_SECRET no arquivo .env so servidor",
        });
    }

    //Tenta obter o token do request
    const token = getTokenFromRequest(req);

    //Caso não tenha o token, irá bloquear o acesso
    if(!token) {
        return res
        .status(401)
        .json({message: "Token não foi informado. Faça login para continuar"});
    }

    try {
        //Valida o token e obtém os dados que você colocou no Login
        // pegando de diferentes chaves caso eu use outra nomeclatura
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Por convenção, guardaremos só o id do usuario no request
        const userId = decoded.id || decoded._id || decoded.userId || decoded.sub;

        //Anexa o usuarui no req para as proximas rotas
        req.user = {
            id: userId,
        };

        //Segue o fluxo para o proximo middleware
        return next();
    
    } catch (err) {
        // Diferencia erros comuns de token
        if (err.name === "TokenExperidError") {
            return res.status(401)
            .json({ message: "Sessão expirada. Faça o login novamente "});
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalido "});
        }

        //Falhas inesperadas
        return res.status(401)
        .json({ message: "Falha na autenticação do token", detail: err.message });
    }
}