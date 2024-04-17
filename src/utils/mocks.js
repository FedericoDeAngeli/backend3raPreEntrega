import { UserManager } from "../models/userModel.js"
import { dbProductos } from "../models/productModel.js"
import { dbCart } from "../models/cartModel.js"
import { hashear } from "./criptografia.js"

import { faker } from "@faker-js/faker"
import passport from "passport"
import { logger } from "./logger.js"
 
export const users = [
    { name: "Federico", lastname: "De Angeli", email: "fd@mail.com", age: 33, password: "123", rol: "admin"},
    { name: "María Ana", lastname: "Demagistri", email: "md@mail.com", age: 31, password: "123", rol: "admin"},
    { name: "Mariano", lastname: "Aquino", email: "ma@mail.com", age: 33, password: "123", rol: "admin"},
    { name: "Lionel", lastname: "Messi", email: "lm@mail.com", age: 35, password: "123", rol: "premium"},
    { name: "Sergio", lastname: "Aguero", email: "sa@mail.com", age: 17, password: "123", rol: "user"},
    { name: "Papu", lastname: "Gomez", email: "pg@mail.com", age: 28, password: "123", rol: "user"},
    { name: "Lionel", lastname: "Scaloni", email: "ls@mail.com", age: 43, password: "123", rol: "premium"},
    { name: "Ricardo", lastname: "Gareca", email: "rg@mail.com", age: 61, password: "123", rol: "user"},
    { name: "Davoo", lastname: "Xeneixe", email: "dx@mail.com", age: 21, password: "123", rol: "user"},
    { name: "Ricardo", lastname: "Iorio", email: "ri@mail.com", age: 57, password: "123", rol: "user"},
    { name: "Anto", lastname: "Rocuzzo", email: "ar@mail.com", age: 35, password: "123", rol: "user"},
    { name: "Marcela", lastname: "Sal", email: "ms@mail.com", age: 60, password: "123", rol: "user"},
    { name: "Patricio", lastname: "De Angeli", email: "ri@mail.com", age: 72, password: "123", rol: "user"},
    { name: "Marcos", lastname: "Acuña", email: "mac@mail.com", age: 30, password: "123", rol: "user"},
    { name: "Gio", lastname: "Lo Celso", email: "gl@mail.com", age: 27, password: "123", rol: "user"},
]

 const products = [
     {_id: "a1", title: "Curcuma", description: "India", price: 200, thumbnail: "img1", code: "1", stock: 8, status: "true",category: "Especia"},
     {_id: "a2", title: "Aceite", description: "Oliva", price: 3000, thumbnail: "img2", code: "2", stock: 5, status: "true",category: "Aceite"},
     {_id: "a3", title: "Pimienta", description: "Negra", price: 350, thumbnail: "img3", code: "3", stock: 10, status: "true",category: "Especia"},
     {_id: "a4", title: "Pimentón", description: "Español", price: 500, thumbnail: "img4", code: "4", stock: 13, status: "true",category: "Especia"},
     {_id: "a5", title: "DogChow", description: "Perros", price: 1500, thumbnail: "img5", code: "5 ", stock: 3, status: "true",category: "Balanceados"},
     {_id: "a6", title: "CatChow", description: "Gatos", price: 2000, thumbnail: "img6", code: "6", stock: 2, status: "true",category: "Balanceados"},
     {_id: "a7", title: "Azafran", description: "Arabe", price: 10000, thumbnail: "img7", code: "7", stock: 1, status: "true",category: "Especia"},
     {_id: "a8", title: "Ositos de miel", description: "Cereales", price: 800, thumbnail: "img8", code: "8", stock: 8, status: "true",category: "Cereal"},
     {_id: "a9", title: "Cerechoc", description: "Chocolate", price: 950, thumbnail: "img9", code: "9", stock: 15, status: "true",category: "Cereal"},
     {_id: "a10", title: "Gomitas", description: "Arcor", price: 1100, thumbnail: "img10", code: "10", stock: 6, status: "true",category: "Gomitas"},
     {_id: "a11", title: "Chizzito", description: "Chizzo", price: 800, thumbnail: "img11", code: "11", stock: 7, status: "true",category: "Cereal"},
     {_id:"a12", title: "Comino", description: "India", price: 300, thumbnail: "img12", code: "12", stock: 8, status: "true",category: "Especia"},

]





const carts = [{_id: "123", product: [{pid: "a3", quantity:5}, {pid: "a1", quantity:2}]},
         
]




 export async function initialize(){
     await UserManager.deleteMany({})
     for (const p of users) {
        p.password = hashear(p.password)
     }
   await UserManager.insertMany(users)
//   for (const p of usersMocks) {
//     const hashPass = hashear(p.password)
//     return hashPass
// }
 logger.debug("Registro Usuarios actualizado")

 await dbProductos.deleteMany({})
 await dbProductos.insertMany(products)
 logger.debug("Registro de Productos actualizado")

//  await dbCart.deleteMany({})
//  await dbCart.insertMany(carts),
// logger.debug("Registro de Carts actualizado")

 }