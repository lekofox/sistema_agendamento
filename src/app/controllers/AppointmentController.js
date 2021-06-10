import Appointment from "../models/Appointment";
import * as Yup from 'yup'
import User from "../models/User";
import { startOfHour, parseISO, isBefore } from 'date-fns'
import File from '../models/File'

class AppointmentController {

    async index(req, res) {
        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId, canceled_at: null,
            },
            order: ['date'],
            attributes: ['id','date','user_id'],
            include: [{
                model: User,
                as:  'collaborator',
                attributes: ['id','name'],
                include:[{
                    model: File,
                    as: 'photo',
                    attributes: ['path','url']
                }]
            }]
        })

        return res.json({
            appointments
        })
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Erro na validação'
            })
        }
        const { collaborator_id, date } = req.body

        const isCollaborator = await User.findOne({
            where: { id: collaborator_id, provider: true }
        })
        if (!isCollaborator) {
            return res.status(401).json({
                message: 'Colaborador não localizado'
            })
        }
        const startHour = startOfHour(parseISO(date))

        if (isBefore(startHour, new Date())) {
            return res.status(400).json({
                message: 'Horário não disponivel'
            })
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                collaborator_id,
                canceled_at: null,
                date: startHour

            }
        })

        if (checkAvailability) {
            return res.status(400).json({
                message: 'Horário não disponivel para este colaborador'
            })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date: startHour

        })
        return res.json(appointment)
    }
}

export default new AppointmentController;