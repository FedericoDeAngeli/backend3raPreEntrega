import { dbCart } from "../models/cartModel.js"
import CustomError from "../services/errors/customErrors.js"
import EError from "../services/errors/enums.js"
import { logger } from "../utils/logger.js"

 class cartDao{

    async create(data){
        const cart = await dbCart.create(data)
        return cart    

    }

    async readOne(id){////TODO populate
        const cart = await dbCart.findById(id).populate("product.pid").lean()
        if(!cart)   CustomError.createError({
            name: "Cart not found",
            cause: "Invalidad Id",
            message: logger.error("Cart not found"),
            code: EError.INVALID_VALUE
        })
        return cart
    }

    async readMany(){//TODO populate
        const carts = await dbCart.find().populate("product.pid").lean()
        return carts
    }

    async updateOne(id, pid, quantity){
        const cart = await dbCart.findById(id).lean()
        if(!cart) throw new Error ("Cart not found")
        const productInCart =  cart.product.find(product => product.pid === pid)
        if(!productInCart){
            if(!quantity){
            await dbCart.findByIdAndUpdate(id,
                {$push: {product: {pid: pid, quantity: 1}}},
                {new: true}).lean()
            }else{
                await dbCart.findByIdAndUpdate(id,
                    {$push: {product: {pid: pid, quantity: quantity}}},
                    {new: true}).lean()
            }

        }else{
                     
            if(!quantity){
           const updatedCart = await dbCart.findOneAndUpdate( 
            { _id: id, 'product.pid': pid },
           { $inc: { 'product.$.quantity': 1 } },
           { new: true }).lean()
        }else{
            const updatedCart = await dbCart.findOneAndUpdate( 
                { _id: id, 'product.pid': pid },
               { $inc: { 'product.$.quantity': quantity } },
               { new: true }).lean()
        }
           return updatedCart
        }
    }

    async deleteProd(_id, pid){
        const cart = await dbCart.findById(_id)
        if(!cart) throw new Error ("Cart not found")

        const  productInCart = cart.product.find(product => product.pid === pid)
        if(!productInCart) throw new Error ("Product not found")
        console.log(productInCart)
        const updatedCart = await dbCart.findOneAndUpdate({ _id: _id, 'product.pid': pid },
        { $push: { 'product.$.quantity': 0 } },
        { new: true }).lean()

            return updatedCart            
    }

    async deleteOne(id){
        await dbCart.findByIdAndDelete(id)
        
       
    }

}

export const cartDaoModel = new cartDao()