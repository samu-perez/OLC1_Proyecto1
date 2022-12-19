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
const decFuncion = require('./instrucciones/decFuncion')
const main = require('./instrucciones/main')
const sentenciaReturn = require('./instrucciones/return')
const cicloFor = require('./instrucciones/for')
const sentenciaSwitch = require('./instrucciones/switch')

const VarStatic = require('./simbolos/static')

const traducir = (req, res) => {
    const {entrada} = req.body
    //console.log('ENTRADA:', entrada)

    VarStatic.listaErrores = []
    const ast = parser.parse(entrada)
    //console.log('AST:', ast)
    //console.log('===========================================')

    const traduccion_ = traduccion(ast)
    res.json(traduccion_)
}

const traduccion = (instrucciones) => {
    let salidaPython = ""
    VarStatic.salidaHTML = ""
    VarStatic.tablaSimbolos = []
    
    instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            salidaPython += declaracion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            salidaPython += asignacion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            salidaPython += print(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            salidaPython += sentenciaIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE){
            salidaPython += sentenciaIfElse(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE_IF){
            salidaPython += sentenciaIfElseIf(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            salidaPython += cicloWhile(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            salidaPython += cicloDoWhile(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO){
            salidaPython += decMetodo(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_FUNCION){
            salidaPython += decFuncion(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.MAIN){
            salidaPython += main(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            salidaPython += cicloFor(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            salidaPython += sentenciaSwitch(instruccion) + "\n"
        }
    })

    crearArchivosSalida(salidaPython, VarStatic.salidaHTML)

    return {
        salidaPython: salidaPython,
        salidaHTML: VarStatic.salidaHTML,
        tablaSimbolos: VarStatic.tablaSimbolos,
        listaErrores: VarStatic.listaErrores
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
        } else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            salida += "\t" + sentenciaReturn(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            salida += "\t" + "break" + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            salida += "\t" + "continue" + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            salida += "\t" + cicloFor(instruccion) + "\n"
        } else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            salida += "\t" + sentenciaSwitch(instruccion) + "\n"
        }
    })
    return salida
}

const crearArchivosSalida = (salidaPython, salidaHTML) => {
    const fs = require('fs');
    fs.writeFile("src/archivos-salida/salida.py", salidaPython, function(err) {
        if (err) {
          return console.log('Error - archivo salidaPython');
        }
        console.log("El archivo salidaPython fue creado correctamente");
    });
    fs.writeFile("src/archivos-salida/salida.html", salidaHTML, function(err) {
        if (err) {
          return console.log('Error - archivo salidaHTML');
        }
        console.log("El archivo salidaHTML fue creado correctamente");
    });
}

module.exports = {
    traducir,
    bloque
}