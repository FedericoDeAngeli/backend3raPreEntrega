import { productDAOModel } from "../dao/product.dao.js";

class ProductRepository{

    async getAllProducts(){
        return await productDAOModel.readMany()
    }

    async getProduct(id){
        console.log("product repostiroy")
        return await productDAOModel.readOne(id)
    }

    async createProduct(data){
        return await productDAOModel.create(data)
    }

    async updateProduct(id, data){
        return await productDAOModel.updateOne(id, data)
    }

    async deleteProduct(id){
        return await productDAOModel.deleteOne(id)
    }
}

export const productRepository = new ProductRepository()