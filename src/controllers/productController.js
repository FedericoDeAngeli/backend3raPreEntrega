import { productService } from "../services/productServices.js"

export async function handleGet( req, res, next){
   try {
    if(req.params.id){
        const product = await productService.getProduct(req.params.id)
        res.json(product)
    }else{
        const product = await productService.getAllProducts()
        res.json(product)
    }
   } catch (error) {
    res.json(error)
   }
}
    
 export  async function handlePost(req, res, next) {
    try {
        
            res.json(await productService.createProduct(req.body))
        
    } catch (error) {
        res.json(error)
    }
   }

   export async function handlePut(req, res, next) {
    try {
    await productService.updateProduct(req.params.id, req.body)
    res.send("Updated product")

    } catch (error) {
        res.json(error)
   }
}

export async function handleDelete(req, res, next) {
    try {
        await productService.deleteProduct(req.params.id)
        res.send("Delete ok")
    } catch (error) {
        res.json(error)
    }
}
