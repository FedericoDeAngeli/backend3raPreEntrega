import { Schema, model } from "mongoose";
import {randomUUID} from "crypto"

const collection = "ticket"

export const TicketSchema = new Schema({
    _id: {type: String, default: randomUUID()},
    code: {type: Number},
    purchaseDateTime: {type: String},
    amount: {type: Number},
    purchaser: {type: String}
},{
    strict: "throw",
    versionKey: false,
    statics:{},
    methods: {}
})

export const TicketManager = model(collection, TicketSchema)