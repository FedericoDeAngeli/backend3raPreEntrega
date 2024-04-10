import {Router} from "express"
import { handleDelete, handleGet, handlePost } from "../../controllers/cartController.js"
import { soloUser } from "../../middlewares/authorizate.js"
import { dbCart } from "../../models/cartModel.js"

export const cartRouter = Router()

cartRouter.get("/", handleGet)
cartRouter.get("/:id", handleGet)

cartRouter.post("/", soloUser, handlePost)
cartRouter.post("/:id/product/:pid", soloUser, handlePost)
cartRouter.post("/:id/purchase", async (req, res) => {
    const cartId = await dbCart.findById(req.params.id).populate("product.pid")
    if(!cartId) throw new Error("Cart not found")

    if(!req.user) throw new Error ("You must be logged in")
    req.user["cart"] = cartId
res.send("Purchased")
})

cartRouter.delete("/:id", soloUser, handleDelete)
cartRouter.delete("/:id/product/:pid", soloUser, handleDelete)


