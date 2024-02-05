import { dbProductos } from "../models/productModel.js"

export class productDAO {
    async create(data){
        const product = await dbProductos.create(data).toObject()
        return product
    }

    async readOne(id){
        const product = await dbProductos.findById(id)
        if(!product) throw new Error ("Cart not found")
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