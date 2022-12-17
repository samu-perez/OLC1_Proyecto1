const parser = require('../analizador/analizador')
const TIPO_INSTRUCCION = require('./enums/tipoInstruccion')
const declaracion = require('./instrucciones/declaracion')
const asignacion = require('./instrucciones/asignacion')
const print = require('./instrucciones/print')
const sentenciaIf = require('./instrucciones/if')
const sentenciaIfElse = require('./instrucciones/ifElse')
const sentenciaIfElseIf = require('./instrucciones/ifElseIf')
const cicloWhile = require('./instrucciones/while')
const cicloDoWhile = require('./instrucciones/doWhile')
const decMetodo = require('./instrucciones/decMetodo')


const traducir = (req, res) => {
    const {entrada} = req.body
    console.log('ENTRADA:', entrada)
    const ast = parser.parse(entrada)
    console.log('AST:', ast)
    console.log('===========================================')
    const traduccion_ = traduccion(ast)
    res.json(traduccion_)
}

const traduccion = (instrucciones) => {
    let salida = ""
    
    instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            console.log('Esta es una DECLARACION:', instruccion)
            salida += declaracion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            console.log('Esta es una ASIGNACION:', instruccion)
            salida += asignacion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            console.log('Este es un PRINT:', instruccion)
            salida += print(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            console.log('Este es un IF:', instruccion)
            salida += sentenciaIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE){
            console.log('Este es un IF ELSE:', instruccion)
            salida += sentenciaIfElse(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE_IF){
            console.log('Este es un IF ELSE IF:', instruccion)
            salida += sentenciaIfElseIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            console.log('Este es un WHILE:', instruccion)
            salida += cicloWhile(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            console.log('Este es un DO WHILE:', instruccion)
            salida += cicloDoWhile(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO){
            console.log('Este es una DEC METODO:', instruccion)
            salida += decMetodo(instruccion) + "\n"
        }
    })

    return {
        salidaPython: salida
    }
}

const bloque = (instrucciones) => {
    let salida = ""
    instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            salida += "\t" + declaracion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            salida += "\t" + asignacion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            salida += "\t" + print(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            salida += "\t" + sentenciaIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE){
            salida += "\t" + sentenciaIfElse(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE_IF){
            salida += "\t" + sentenciaIfElseIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            salida += "\t" + cicloWhile(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            salida += "\t" + cicloDoWhile(instruccion) + "\n"
        }
    })
    return salida
}

module.exports = {
    traducir,
    bloque
}