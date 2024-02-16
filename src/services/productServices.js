import { productRepository } from "../repository/productRepository.js";

class ProductService{
    async getAllProducts(){
        return await productRepository.getAllProducts();
    }

    async getProduct(id){
        console.log("productServices")
        return await productRepository.getProduct(id)
    }

    async createProduct(data){
        return await productRepository.createProduct(data)
    }

    async updateProduct(id, data){
        return await productRepository.updateProduct(id, data)
    }

    async deleteProduct(id){
        return await productRepository.deleteProduct(id)
    }
}

export const productService = new ProductService()