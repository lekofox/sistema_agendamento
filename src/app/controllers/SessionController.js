import User from "../models/User"
import jwt from 'jsonwebtoken'

class SessionController{
    async store(){
        const {email, password} = req.body
        const user = await User.findOne({where: { email}})

        if (!user){
            return res.status(401).json({error: 'Usuário não encontrado'})
        }

        if (!(await user.checkPassword(password))){
            return res.status(401).json({error: 'Senha inválida'})
        }
        const {id, name} = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({id,})
        })
    }
}