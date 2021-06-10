import databaseConfig from '../config/database';
import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File'
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database{
    constructor(){
        this.init() 

    }

    init(){
        this.connection = new Sequelize(databaseConfig)
        models.forEach(model => model.init(this.connection))
        models.forEach(model => model.associate && model.associate(this.connection.models))
    }
}

export default new Database();