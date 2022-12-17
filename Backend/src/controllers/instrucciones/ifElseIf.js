const operacion = require('../operaciones/operacion')

const sentenciaIfElseIf = (instruccion) => {
    const valorOpIf = operacion(instruccion.expresion)
    const bloque = require('../analisis.controller').bloque
    const traduccionBloqueIf = bloque(instruccion.instruccionesIf)

    let traduccion = "if " + valorOpIf.valor + ":\n" + traduccionBloqueIf

    instruccion.lista_elseif.forEach(instruccionElseIf => {
        const valorOpElseIf = operacion(instruccionElseIf.expresion)
        const traduccionBloqueElseIf = bloque(instruccionElseIf.instruccionesElseIf)
        traduccion += "elif " + valorOpElseIf.valor + ":\n" + traduccionBloqueElseIf
    })

    if(instruccion.instruccionesElse != null){
        const traduccionBloqueElse = bloque(instruccion.instruccionesElse)
        traduccion += "else:\n" + traduccionBloqueElse
    }
    
    return traduccion
}

module.exports = sentenciaIfElseIf