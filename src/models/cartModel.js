import {Schema, model} from "mongoose"
import {randomUUID} from "crypto"

const collection = "cart"
export const CartSchema = new Schema({
    _id: {type: String, default: randomUUID()},
    product: [{pid:{type: String, ref: "productos"},
            quantity: {type: Number}
    }]
},{
    strict: "throw",
    versionKey: false,
    statics: {},    
    methods:{}
})

export const dbCart = model(collection, CartSchema)

//-----------------------------------------------------------------