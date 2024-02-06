import { Schema, model } from "mongoose";
import {randomInt, randomUUID} from "crypto"

const collection = "ticket"

export const TicketSchema = new Schema({
    _id: {type: String, default: randomUUID()},
    code: {type: Number, default: randomInt(10, 1000 )},
    purchaseDateTime: {type: String, default: Date.now()},
    amount: {type: Number},
    purchaser: {type: String}
},{
    strict: "throw",
    versionKey: false,
    statics:{},
    methods: {}
})

export const TicketManager = model(collection, TicketSchema)