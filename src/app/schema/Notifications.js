import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true
    },
    read: {
        
    }


})