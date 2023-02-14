import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/item";
import { logMiddleware } from "../middlewares/log";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get('/', checkJwt, logMiddleware, getItems)
router.post('/', createItem)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export { router }