/* ======================================= IMPORTACIONES ========================================== */
%{
    const TIPO_OPERACION = require('../controllers/enums/tipoOperacion')
    const TIPO_VALOR = require('../controllers/enums/tipoValor')
    const TIPO_DATO = require('../controllers/enums/tipoDato')
    const INSTRUCCION = require('../controllers/instrucciones/instruccion')
    const VarStatic = require('../controllers/simbolos/static')
%}


/* ======================================= LÉXICO ========================================== */

/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                                     /* skip whitespace */
"//".*                                  // comentario lineal
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     // comentario multiple línea 

"int"                   return 'Rint'
"double"                return 'Rdouble'
"bool"                  return 'Rboolean'
"char"                  return 'Rchar'
"string"                return 'Rstring'

"true"                  return 'Rtrue'
"false"                 return 'Rfalse'

"Console"               return 'Rconsole'
"Write"                 return 'Rwrite'
"if"                    return 'Rif'
"else"                  return 'Relse'
"while"                 return 'Rwhile'
"do"                    return 'Rdo'
"void"                  return 'Rvoid'
"main"                  return 'Rmain'
"return"                return 'Rreturn'
"break"                 return 'Rbreak'
"continue"              return 'Rcontinue'
"for"                   return 'Rfor'
"switch"                return 'Rswitch'
"case"                  return 'Rcase'
"default"               return 'Rdefault'

[0-9]+("."[0-9]+)\b     return 'decimal'
"."                     return 'punto'
[0-9]+\b                return 'entero'
"=="                    return 'igualigual'       
"!="                    return 'diferente'
"<="                    return 'menorIgual'
"<"                     return 'menor'
">="                    return 'mayorIgual'
"="                     return 'igual'
">"                     return 'mayor'
","                     return 'coma'
";"                     return 'ptcoma'
":"                     return 'dospuntos'
"||"                    return 'or'
"&&"                    return 'and'
"{"                     return 'llaveA'
"}"                     return 'llaveC'
"*"                     return 'por'
"/"                     return 'div'
"--"                    return 'menosmenos'
"++"                    return 'masmas'
"-"                     return 'menos'
"+"                     return 'mas'
"^"                     return 'exponente'
"!"                     return 'not'
"%"                     return 'modulo'
"("                     return 'parA'
")"                     return 'parC'
"["                     return 'corchA'
"]"                     return 'corchC'

([a-zA-Z])([a-zA-Z0-9_])*               return 'identificador'
["\""]([^"\""])*["\""]                  return 'string'
["\'"]([^"\'"])*["\'"]                  return 'char'

<<EOF>>                 return 'EOF'    // Fin de archivo
. { 
    console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    VarStatic.listaErrores.push({tipoError: 'Léxico', linea: yylloc.first_line, columna: yylloc.first_column, descripcion: 'El carácter ' + yytext + ' no pertenece al lenguaje.'})
}

/lex


/* ======================================= SINTÁCTICO ========================================== */

/* operator associations and precedence */
%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'menor' 'menorIgual' 'mayor' 'mayorIgual' 'diferente'
%left 'mas' 'menos'
%left 'por' 'div' 'modulo' 
%nonassoc 'exponente'
%left umenos 

%start INICIO

%% /* language grammar */

INICIO: INSTRUCCIONES EOF{return $1;}
;

/*INICIO: INSTRUCCIONES EOF { return {ast: $1, erroresLexicos: erroresLexicos} }
;*/

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$ = $1; $1.push($2);}
    | INSTRUCCION {$$ = [$1];}
    //| error INSTRUCCION { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
    
;

INSTRUCCION: DEC_VAR {$$ = $1;}                          // DECLARACION DE VARIABLE
    | ASIG_VAR {$$ = $1;}                                // ASIGNACION DE VARIABLE
    | PRINT {$$ = $1;}
    | IF {$$ = $1;}
    | WHILE {$$ = $1;}
    | DOWHILE {$$ = $1;}
    | METODO {$$ = $1;}
    | FUNCION {$$ = $1;}
    | MAIN {$$ = $1;}
    | RETURN {$$ = $1;}
    | BREAK {$$ = $1;}
    | CONTINUE {$$ = $1;}
    | FOR {$$ = $1;}
    | SWITCH {$$ = $1;}
    | error DEC_VAR { console.error('DEC_VAR - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: DEC_VAR'})}
    | error ASIG_VAR { console.error('ASIG_VAR - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: ASIG_VAR'})}
    | error PRINT { console.error('PRINT - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: PRINT'})}
    | error IF { console.error('IF - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: IF'})}
    | error WHILE { console.error('WHILE - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: WHILE'})}
    | error DOWHILE { console.error('DOWHILE - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: DOWHILE'})}
    | error METODO { console.error('METODO - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: METODO'})}
    | error FUNCION { console.error('FUNCION - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: FUNCION'})}
    | error MAIN { console.error('MAIN - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: MAIN'})}
    | error FOR { console.error('FOR - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: FOR'})}
    | error SWITCH { console.error('SWITCH - Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column+1); VarStatic.listaErrores.push({tipoError: 'Sintáctico', linea: this._$.first_line, columna: this._$.first_column+1, descripcion: 'Error en Instrucción: SWITCH'})}
;

DEC_VAR: TIPO identificador ptcoma { $$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1) }
    | TIPO identificador igual EXPRESION ptcoma { $$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line, this._$.first_column+1) }
;

ASIG_VAR: identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line, this._$.first_column+1)}    
;

PRINT: Rconsole punto Rwrite parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoPrint($5, this._$.first_line, this._$.first_column+1)}
;

IF: Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoIf($3, $6, this._$.first_line, this._$.first_column+1)} 
    | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC Relse llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoIfElse($3, $6, $10, this._$.first_line, this._$.first_column+1)}
    | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC ELSEIF  {$$ = INSTRUCCION.nuevoIfConElseIf($3, $6, $8, null, this._$.first_line, this._$.first_column+1)}
    | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC ELSEIF Relse llaveA INSTRUCCIONES llaveC {$$= INSTRUCCION.nuevoIfConElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;

ELSEIF: ELSEIF CONEIF{$$ = $1; $1.push($2);}
    | CONEIF {$$ = [$1];}
;

CONEIF: Relse Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoElseIf($4, $7, this._$.first_line, this._$.first_column+1) }
;

WHILE: Rwhile parA EXPRESION parC llaveA INSTRUCCIONES llaveC  {$$ = INSTRUCCION.nuevoWhile($3, $6, this._$.first_line, this._$.first_column+1)}
;

DOWHILE: Rdo llaveA INSTRUCCIONES llaveC Rwhile parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoDoWhile($7, $3, this._$.first_line, this._$.first_column+1)}
;

FOR: Rfor parA INICIOFOR FINFOR INCREMENTO_DECREMENTO parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoFor($3, $4, $5, $8, this._$.first_line, this._$.first_column+1)}
;

INICIOFOR: DEC_VAR {$$ = $1;}
    | ASIG_VAR {$$ = $1;}
;

FINFOR: EXPRESION ptcoma {$$ = $1;}
;

INCREMENTO_DECREMENTO: identificador masmas {$$ = INSTRUCCION.nuevoIncrementoDecremento($1, TIPO_OPERACION.INCREMENTO, this._$.first_line, this._$.first_column+1);}
    | identificador menosmenos {$$ = INSTRUCCION.nuevoIncrementoDecremento($1, TIPO_OPERACION.DECREMENTO, this._$.first_line, this._$.first_column+1);}
;


METODO: Rvoid identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line, this._$.first_column+1)}
    | Rvoid identificador parA LIST_PARAMETROS parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line, this._$.first_column+1)}
;

FUNCION: TIPO identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevaFuncion($1, $2, null, $6, this._$.first_line, this._$.first_column+1)}
    | TIPO identificador parA LIST_PARAMETROS parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevaFuncion($1, $2, $4, $7, this._$.first_line, this._$.first_column+1)}
;

LIST_PARAMETROS: LIST_PARAMETROS coma PARAMETRO {$$ = $1; $1.push($3);}
    | PARAMETRO {$$ = [$1];}
;

PARAMETRO: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1);}
;

MAIN: Rvoid Rmain parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMain($6, this._$.first_line, this._$.first_column+1)}
;


SWITCH: Rswitch parA EXPRESION parC llaveA LIST_CASES llaveC {$$ = INSTRUCCION.nuevoSwitchCase($3, $6, null, this._$.first_line, this._$.first_column+1)}
    | Rswitch parA EXPRESION parC llaveA LIST_CASES Rdefault dospuntos INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoSwitchCase($3, $6, $9, this._$.first_line, this._$.first_column+1);}
    //| Rswitch parA EXPRESION parC llaveA Rdefault dospuntos INSTRUCCIONES llaveC {$$= new INSTRUCCION.nuevoSwitchDefault($3, $8, this._$.first_line,this._$.first_column+1)}
;

LIST_CASES: LIST_CASES CASE {$1.push($2); $$ = $1;}
    | CASE {$$ = [$1];}
;

CASE: Rcase EXPRESION dospuntos INSTRUCCIONES {$$ = INSTRUCCION.nuevoCase($2, $4, this._$.first_line, this._$.first_column+1)}
;


RETURN: Rreturn ptcoma {$$ = INSTRUCCION.nuevoReturn(null, this._$.first_line, this._$.first_column+1)}
    | Rreturn EXPRESION ptcoma {$$ = INSTRUCCION.nuevoReturn($2, this._$.first_line, this._$.first_column+1)}
;

BREAK: Rbreak ptcoma {$$ = INSTRUCCION.nuevoBreak(this._$.first_line, this._$.first_column+1)}
;

CONTINUE: Rcontinue ptcoma {$$ = INSTRUCCION.nuevoContinue(this._$.first_line, this._$.first_column+1)}
;


TIPO: Rint{$$ = TIPO_DATO.ENTERO}
    | Rdouble{$$ = TIPO_DATO.DECIMAL}
    | Rchar {$$ = TIPO_DATO.CHAR}
    | Rboolean{$$ = TIPO_DATO.BOOL}
    | Rstring {$$ = TIPO_DATO.CADENA}
;


EXPRESION: EXPRESION mas EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.SUMA, this._$.first_line, this._$.first_column+1);}
    | EXPRESION menos EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.RESTA, this._$.first_line, this._$.first_column+1);}
    | EXPRESION por EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION, this._$.first_line, this._$.first_column+1);}
    | EXPRESION div EXPRESION   {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION, this._$.first_line, this._$.first_column+1);}
    /*| EXPRESION exponente EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line, this._$.first_column+1);}
    | EXPRESION modulo EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line, this._$.first_column+1);}*/
    | EXPRESION menor EXPRESION    {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENOR, this._$.first_line, this._$.first_column+1);}
    | EXPRESION mayor EXPRESION    {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR, this._$.first_line, this._$.first_column+1);}
    | EXPRESION menorIgual EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENORIGUAL, this._$.first_line, this._$.first_column+1);}
    | EXPRESION mayorIgual EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYORIGUAL, this._$.first_line, this._$.first_column+1);}
    | EXPRESION diferente EXPRESION  {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.DIFERENTE, this._$.first_line, this._$.first_column+1);}
    | EXPRESION igualigual EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.IGUALIGUAL, this._$.first_line, this._$.first_column+1);}
    | EXPRESION and EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.AND, this._$.first_line, this._$.first_column+1);}
    | EXPRESION or EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.OR, this._$.first_line, this._$.first_column+1);}
    | not EXPRESION {$$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT, this._$.first_line, this._$.first_column+1);}
    | menos EXPRESION %prec umenos {$$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NEGATIVO, this._$.first_line, this._$.first_column+1);}
    | parA EXPRESION parC {$$ = $2}
    | decimal {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line, this._$.first_column+1);}
    | entero {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line, this._$.first_column+1);}
    | Rtrue {$$ = INSTRUCCION.nuevoValor('True', TIPO_VALOR.BOOL, this._$.first_line, this._$.first_column+1);}
    | Rfalse {$$ = INSTRUCCION.nuevoValor('False', TIPO_VALOR.BOOL, this._$.first_line, this._$.first_column+1);}
    | string {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line, this._$.first_column+1);}
    | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line, this._$.first_column+1);}
    | char {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CHAR, this._$.first_line, this._$.first_column+1);}
;