import { Router } from 'express'
import { dbProductos } from '../../models/productModel.js'
import { productService } from '../../services/productServices.js'
import { soloAdmin } from '../../middlewares/authorizate.js'
import { userService } from '../../services/userServices.js'
import { cartService } from '../../services/cartServices.js'
import { ticketService } from '../../services/ticketServices.js'


export const webRouter = Router()



webRouter.get('/', async (req, res) => { return res.redirect('/login') })

webRouter.get('/register', async (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

webRouter.get('/profile/:id', async (req, res) => {
  const _id = req.params.id
console.log(_id, typeof _id)
  const user = await userService.getUserbyId(_id)
  console.log(user)
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: user,
  })
})

webRouter.get('/login', async (req, res) => {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

webRouter.get('/api/cart/:id', async (req, res) => {
  const cartId = await cartService.getCart(req.params.id) 
  console.log(cartId._id)
  
    res.render('products.handlebars', {
      pageTitle: 'Productos',
      cartId : cartId._id,
      products: await productService.getAllProducts()
    })
  })

webRouter.get("/updateuser", soloAdmin, async (req, res) => {
  res.render('updateuser.handlebars', {
    pageTitle: 'Update User'
  })
})

webRouter.get('/current', (req, res) => {
  res.render('current.handlebars', {
    pageTitle: 'Perfil actual',
    user: req.user,
  })
})

webRouter.get("/cart/:id", async (req, res) => {
  const cart = await cartService.getCart(req.params.id)
  res.render('cart.handlebars', {
    pageTitle: 'Carrito',
    products: cart.product,
    cartId: cart._id
    
  })
})

webRouter.get("/ticket/:id", async (req, res) => {
  const ticket = await ticketService.getTicket(req.params.id)
  const user = req.user.email
  const cart = req.user.cart
  res.render('ticket.handlebars', {
    pageTitle: 'Ticket',
    cart,
    user,
    ticket

  })
})