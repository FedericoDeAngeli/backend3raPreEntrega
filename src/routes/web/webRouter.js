import { Router } from 'express'
import { dbProductos } from '../../models/productModel.js'
import { productService } from '../../services/productServices.js'
import { soloAdmin } from '../../middlewares/authorizate.js'
import { userService } from '../../services/userServices.js'


export const webRouter = Router()



webRouter.get('/', async (req, res) => { return res.redirect('/login') })

webRouter.get('/register', async (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

webRouter.get('/profile/:id', async (req, res) => {
  const user = await userService.getUserbyId(req.params.id)
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

webRouter.get('/products', async (req, res) => {
    res.render('products.handlebars', {
      pageTitle: 'Productos',
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