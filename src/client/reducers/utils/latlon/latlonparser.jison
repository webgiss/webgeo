%{
const {createEFloat, createFFloat, createInteger, createDegree, createMinute, createSecond, createLat, createLon, createCoord} = require('./objects.js')
%}

%lex
%%

\n                                          {}
\s+                                         {}
\t                                          {}
"/"                                         {return 'SEP'}
";"                                         {return 'SEP'}
"-"?[0-9]+"."[0-9]+                         {return 'EFLOAT'}
"-"?[0-9]+","[0-9]+                         {return 'FFLOAT'}
"-"?[0-9]+                                  {return 'INTEGER'}
","                                         {return 'SEP'}
"-"                                         {return 'SEP'}
"North"                                     {return 'NORTH'}
"north"                                     {return 'NORTH'}
"Nord"                                      {return 'NORTH'}
"nord"                                      {return 'NORTH'}
"East"                                      {return 'EAST'}
"east"                                      {return 'EAST'}
"Est"                                       {return 'EAST'}
"est"                                       {return 'EAST'}
"West"                                      {return 'WEST'}
"west"                                      {return 'WEST'}
"Ouest"                                     {return 'WEST'}
"ouest"                                     {return 'WEST'}
"South"                                     {return 'SOUTH'}
"south"                                     {return 'SOUTH'}
"Sud"                                       {return 'SOUTH'}
"sud"                                       {return 'SOUTH'}
[°hd]                                       {return 'DEGREE'}
[’′'m]                                      {return 'MINUTE'}
[”″\"]                                      {return 'SECOND'}
[Nn]                                        {return 'NORTH'}
[Ee]                                        {return 'EAST'}
[OWow]                                      {return 'WEST'}
[S]                                         {return 'SOUTH'}
"s"                                         {return 'SOUTH_OR_SECOND'}
":"                                         {return 'HOURSEP'}
","                                         {return 'SEP'}
<<EOF>>                                     {return 'EOF'}
.                                           {return 'INVALID'}

/lex

%start expression

%%

expression
    : coord EOF
        {
            return $1
        }
    ;

coord
    : lat lon
        { $$ = createCoord($1,$2) }
    | lat SEP lon
        { $$ = createCoord($1,$3) }
    | lon lat
        { $$ = createCoord($2,$1) }
    | lon SEP lat
        { $$ = createCoord($3,$1) }
    | number number
        { $$ = createCoord(createLat(createDegree($1),0,0,1),createLon(createDegree($2),0,0,1)) }
    | number SEP number
        { $$ = createCoord(createLat(createDegree($1),0,0,1),createLon(createDegree($3),0,0,1)) }
    ;

float
    : EFLOAT
        { $$ = createEFloat(yytext) }
    | FFLOAT
        { $$ = createFFloat(yytext) }
    ;

number
    : float
        { $$ = $1 }
    | INTEGER
        { $$ = createInteger(yytext) }
    ;

degreevalue
    : number DEGREE
        { $$ = createDegree($1) }
    ;

minutevalue
    : number MINUTE
        { $$ = createMinute($1) }
    ;

secondvalue
    : number SECOND
        { $$ = createSecond($1) }
    | number SOUTH_OR_SECOND
        { $$ = createSecond($1) }
    ;

latdir
    : NORTH
        { $$ = 1 }
    | SOUTH
        { $$ = -1 }
    | SOUTH_OR_SECOND
        { $$ = -1 }
    ;

londir
    : EAST
        { $$ = 1 }
    | WEST
        { $$ = -1 }
    ;

lat
    : degreevalue minutevalue secondvalue latdir
        { $$ = createLat($1,$2,$3,$4) }
    | degreevalue minutevalue latdir
        { $$ = createLat($1,$2,0,$3) }
    | degreevalue latdir
        { $$ = createLat($1,0,0,$2) }
    | number HOURSEP number HOURSEP number latdir
        { $$ = createLat(createDegree($1),createMinute($3),createSecond($5),$6) }
    | number HOURSEP number latdir
        { $$ = createLat(createDegree($1),createMinute($3),0,$4) }
    | number latdir
        { $$ = createLat(createDegree($1),0,0, $2) }
    ;

lon
    : degreevalue minutevalue secondvalue londir
        { $$ = createLon($1,$2,$3,$4) }
    | degreevalue minutevalue londir
        { $$ = createLon($1,$2,0,$3) }
    | degreevalue londir
        { $$ = createLon($1,0,0,$2) }
    | number HOURSEP number HOURSEP number londir
        { $$ = createLon(createDegree($1),createMinute($3),createSecond($5),$6) }
    | number HOURSEP number londir
        { $$ = createLon(createDegree($1),createMinute($3),0,$4) }
    | number londir
        { $$ = createLon(createDegree($1),0,0,$2) }
    ;