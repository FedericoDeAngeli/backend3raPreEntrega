import { cartService } from "../services/cartServices.js"

export async function handleGet(req, res, next) {
    try {
        if(req.params.id){//si viene el id por parametro lo busca, si no lo encuentra lanza error, si no lo devuelve
            const carts = await cartService.getCart(req.params.id)
            res.json(carts) 
        }else{
        const carts = await cartService.getAllCarts()
        res.json(carts)}
    } catch (error) {
        res.json(error)
    }
  
}

export async function handlePost (req, res, next) {
    try {
        if(req.params.id && req.params.pid ){
           const newCart = await cartService.updateCart(req.params.id, req.params.pid)
            res.json(newCart);
        }else{
       const carts = await cartService.createCart()
       res.json(carts)
    }
   } catch (error) {
       res.json(error)
   }
}

export async function handleDelete (req, res, next) {
    try {
        if(req.params.pid){
            await cartService.deleteProductInCart(req.params.pid)
            res.send("Delete product from cart")
        }else{
        await cartService.deleteCart(req.params.id)
        res.send("Delete cart successfully")
    }
    } catch (error) {
        res.json(error)
    }
}

