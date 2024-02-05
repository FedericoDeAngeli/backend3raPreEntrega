import { cartDaoModel } from "../dao/cart.dao.js";

class CartRepository{

    async getAllCarts(){
        return await cartDaoModel.readMany()
    }

    async getCart(id){
        return await cartDaoModel.readOne(id)
    }

    async createCart(data){
        return await cartDaoModel.create(data)
    }

    async updateCart(id, pid){
        return await cartDaoModel.updateOne(id, pid)
    }

    async deleteCart(id){
        return await cartDaoModel.deleteOne(id)
    }

    async deleteProductInCart(id, pid){
        return await cartDaoModel.deleteProd(id, pid)
    }
}

export const cartRepository = new CartRepository()