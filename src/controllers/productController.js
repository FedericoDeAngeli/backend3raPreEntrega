import { productService } from "../services/productServices.js"
import { dbProductos } from "../models/productModel.js"
import { faker } from "@faker-js/faker"

import { logger } from "../utils/logger.js"
import { emailService } from "../services/emailServices.js"

export async function handleGet( req, res, next){
   try {
    if(req.params.id){
        console.log("ProductControllerID)")
        const product = await productService.getProduct(req.params.id)
        res.json(product)
    }else{
        const product = await productService.getAllProducts()
        res.json(product)
    }
   } catch (error) {
    logger.warning("Error en handleGet Productos"),
    res.json(error)
   }
}
    
 export  async function handlePost(req, res, next) {
    try {
        if(req.user.rol === "premium"){
        req.body.userId = req.user.email
    }
    
        const product = await productService.createProduct(req.body)
           res.json(product)
        
    } catch (error) {
        logger.warning("Error en handlePost Productos"),
        res.json(error)
    }
   }

   export async function handlePut(req, res, next) {
    try {
    await productService.updateProduct(req.params.id, req.body)
    res.send("Updated product")

    } catch (error) {
        logger.warning("Error en handlePut Productos"),
        res.json(error)
   }
}

export async function handleDelete(req, res, next) {
    try {
        const product =  await productService.getProduct(req.params.id)
        console.log(product.userId)
        if(product.userId){
            let destinatario = "fdeangeli_90@hotmail.com"
         let asunto = "Producto eliminado"
         let mensaje = "Tu producto fue eliminado" 
            emailService.sendEmail(destinatario, asunto, mensaje)
            console.log("Email enviado")
        }
        await productService.deleteProduct(req.params.id)

        res.send("Delete ok")
    } catch (error) {
        logger.warning("Error en handleDelete Productos"),
        res.json(error)
    }
}

export async function handlePostMocK (req, res) {
    const products = []
    for (let index = 0; index < 50; index++) {
        products.push({
            _id: faker.string.uuid(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
             price: faker.commerce.price(),
             thumbnail: faker.image.urlPicsumPhotos(),
             code: faker.number.bigInt(),
             stock: faker.number.int({ max: 20 }),
             status: "true",
             category: faker.commerce.department()
    
        }) 
        
    }
    await dbProductos.insertMany(products)
        console.log("initialized")
    res.send("mock ok")
}