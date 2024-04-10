import { cartRepository} from "../repository/cartRepository.js";

 class CartService {

    async getAllCarts(){
        return await cartRepository.getAllCarts();
    }

    async getCart(id){
        return await cartRepository.getCart(id)
    }

    async createCart(data){
        return await cartRepository.createCart(data)
    }

    async updateCart(id, pid, quantity){
        return await cartRepository.updateCart(id, pid, quantity)
    }

    async deleteCart(id){
        return await cartRepository.deleteCart(id)
    }

    async deleteProductInCart(id, pid){
        return await cartRepository.deleteProductInCart(id, pid)
    }
}

export const cartService = new CartService()
