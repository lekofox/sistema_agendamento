import User from '../models/User'
import Appointment from '../models/Appointment'
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';


class ScheduleController {
    async index(req, res) {



        const checkUser = await User.findOne({
            where: { id: req.userId, provider: true }
        })
        if (!checkUser) {
            return res.status(401).json({
                message: 'Você não é prestador'
            })
        }
        const { date } = req.query;
        const parseDate = parseISO(date)
        const appointments = await Appointment.findAll({
            where: {
                collaborator_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
                },

            },

            order: ['date'],
            attributes: ['id', 'date','user_id'],
            include:{
                model: User,
                as: 'user',
                attributes: ['name','email']
            },

        })
        return res.json(appointments)
    }
}

export default new ScheduleController()
