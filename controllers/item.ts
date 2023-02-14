import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { insertCar, getCars, getCar, updateCar, deleteCar } from "../services/item"
import { handleHttp } from "../utils/error.handle"

interface RequestExt extends Request {
    user?:  string | JwtPayload 
}

const getItem = async (req: Request, res: Response) => {
    try {
        const responseItem = await getCar(req.params.id)
        const data = responseItem ? responseItem : "NOT FOUND"
        res.send(data)
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}

const getItems = async (req: RequestExt, res: Response) => {
    try {
        const responseItems = await getCars()
        res.send({data: responseItems, user: req.user})

    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }    
}

const updateItem = async (req: Request, res: Response) => {
    try {
        const responseItem = await updateCar(req.params.id, req.body)
        res.send(responseItem)
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_ITEM')
    }    
}

const createItem = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await insertCar(body)
        res.send(responseItem)
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_ITEM', e)
    }    
}

const deleteItem = async (req: Request, res: Response) => {
    try {
        const responseItem = await deleteCar(req.params.id)
        res.send(responseItem)
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_ITEM')
    }    
}

export { getItem, getItems, updateItem, createItem, deleteItem }