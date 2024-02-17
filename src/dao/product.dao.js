import { dbProductos } from "../models/productModel.js"
import CustomError from "../services/errors/customErrors.js"
import EError from "../services/errors/enums.js"

export class productDAO {
    async create(data){
        const product = await dbProductos.create(data)
        return product
    }

    async readOne(id){
        console.log("product DAO")

        const product = await dbProductos.findById(id)
        if(!product) {
            CustomError.createError({
                name: "Product not found",
                cause: "Invalidad Id",
                message: "Product not found",
                code: EError.INVALID_VALUE
            })
        }
        return product
    }

    async readMany(){
        const product = await dbProductos.find().lean()
        return product
    }

    async updateOne(id, data){
       
       const updatedProduct = await dbProductos.findByIdAndUpdate(id,
           {$set: data},
           {new: true}).lean()

           return updatedProduct
    }

    async deleteOne(id){
       await dbProductos.findByIdAndDelete(id)
       
    }

}

export const productDAOModel = new productDAO()