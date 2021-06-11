import databaseConfig from '../config/database';
import Sequelize from 'sequelize';
import mongoose from 'mongoose'
import User from '../app/models/User';
import File from '../app/models/File'
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database{
    constructor(){
        this.init() 
        this.mongo()
    }

    init(){
        this.connection = new Sequelize(databaseConfig)
        models.forEach(model => model.init(this.connection))
        models.forEach(model => model.associate && model.associate(this.connection.models))
        
    }
    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb+srv://sistema_agendamento:sistema_agendamento@cluster0.gtlo7.mongodb.net/sistema?retryWrites=true&w=majority',
            {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology:true}
        )
    }
}


export default new Database();