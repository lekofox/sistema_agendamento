import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res ) => {
    const user = await User.create({
        name: 'Leandro',
        email: 'leandro_dias9@hotmail.com',
        password_hash: '1234',
        created_at: '2021-06-02',
        updated_at: '2021-06-02'
        
    });
    return res.json(user)
});
 
export default routes;