import Productoshel from "../models/productos.js"
const Productoshel={
    validarProductoUnico:async (descripcion)=>{
        const existe = await Productoshel.find({descripcion})
        if (existe){
            throw new Error ("producto Existente")
        }
    },
    validarExistaId:async (id)=>{
        const existe = await Productoshel.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    }
}

export default Productoshel