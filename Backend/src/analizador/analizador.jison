/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                                     /* skip whitespace */
"//".*                                  // comentario lineal
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     // comentario multiple línea 

"int"                   return 'Rint'
"double"                return 'Rdouble'
"boolean"               return 'Rboolean'
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
}

/lex

%{
    const TIPO_OPERACION = require('../controllers/enums/tipoOperacion')
    const TIPO_VALOR = require('../controllers/enums/tipoValor')
    const TIPO_DATO = require('../controllers/enums/tipoDato')
    const INSTRUCCION = require('../controllers/instrucciones/instruccion')
%}

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

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$ = $1; $1.push($2);}
    | INSTRUCCION {$$ = [$1];}
;

INSTRUCCION: DEC_VAR ptcoma {$$ = $1;}                          // DECLARACION DE VARIABLE
    | ASIG_VAR ptcoma {$$ = $1;}                                // ASIGNACION DE VARIABLE
    | PRINT {$$ = $1;}
    | IF {$$ = $1;}
    | WHILE {$$ = $1;}
    | DOWHILE {$$ = $1;}
    | METODO {$$ = $1;}
;

DEC_VAR: TIPO identificador  { $$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1) }
    | TIPO identificador igual EXPRESION  { $$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line, this._$.first_column+1) }
;

ASIG_VAR: identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line, this._$.first_column+1)}    
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

METODO: Rvoid identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line, this._$.first_column+1)}
    | Rvoid identificador parA LIST_PARAMETROS parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
;

LIST_PARAMETROS: LIST_PARAMETROS coma PARAMETRO {$$ = $1; $1.push($3);}
    | PARAMETRO {$$ = [$1];}
;

PARAMETRO: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1);}
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
    | Rtrue {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BOOL, this._$.first_line, this._$.first_column+1);}
    | Rfalse {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BOOL, this._$.first_line, this._$.first_column+1);}
    | string {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line, this._$.first_column+1);}
    | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line, this._$.first_column+1);}
    | char {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CHAR, this._$.first_line, this._$.first_column+1);}
;