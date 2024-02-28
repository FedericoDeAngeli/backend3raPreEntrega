import twilio from 'twilio';
import { TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_SID } from '../config.js';

class SMSServiceTwilio {
constructor(){
    this.client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN)
}

    async send(destinatario, mensaje){
        const SMSOptions = {
            from: TWILIO_PHONE_NUMBER,
            to: destinatario,
            body: mensaje

        }
        await this.client.messages.create(SMSOptions)
    }  
}

export const smsService = new SMSServiceTwilio()