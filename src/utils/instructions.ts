export const INSTRUCTIONS = [
    {
        "code": 11,
        "symbol": "CEA",
        "help": "  Copie o contéudo do endereço EE no acumulador. (AC recebe [EE])."
    },
    {
        "code": 12,
        "symbol": "CAE",
        "help": "Copie o contéudo do acumulador no endereço EE. (EE recebe [AC])"
    },
    {
        "code": 21,
        "symbol": "SOM",
        "help": "  Some o contéudo do endereço EE com o contéudo do acumulador e guarde o  resultado no acumulador. (AC recebe [AC] + [EE])"
    },
    {
        "code": 22,
        "symbol": "SUB",
        "help": "Subtraia o contéudo do endereço EE do contéudo do acumulador e guarde  o resultado no acumulador. (AC recebe [AC] - [EE])"
    },
    {
        "code": 23,
        "symbol": "MUL",
        "help": "Multiplique o contéudo do endereço EE com o contéudo do acumulador e  guarde o resultado no acumulador. (AC recebe [AC] * [EE])"
    },
    {
        "code": 24,
        "symbol": "DIV",
        "help": "Divide o contéudo do acumulador pelo contéudo do endereço EE e guarde  o resultado no acumulador. (AC recebe [AC] / [EE])"
    },
    {
        "code": 25,
        "symbol": "MOD",
        "help": "[AC] recebe o resto da divisão [AC] / [EE]."
    },
    {
        "code": 31,
        "symbol": "LER",
        "help": "Leia um número e guarde-o no endereço EE. (EE recebe o valor lido)"
    },
    {
        "code": 41,
        "symbol": "IMP",
        "help": "Imprima o contéudo do endereço EE."
    },
    {
        "code": 50,
        "symbol": "NOP",
        "help": "Nenhuma operação é efetuada."
    },
    {
        "code": 51,
        "symbol": "DES",
        "help": "Desvie a execução para o endereço EE, i.e. AI recebe EE."
    },
    {
        "code": 52,
        "symbol": "DPO",
        "help": "Se o contéudo do acumulador for maior do que zero, desvie a execução  para o endereço EE. (Se [AC] &gt; 0, AI recebe EE)."
    },
    {
        "code": 53,
        "symbol": "DPZ",
        "help": "Se o contéudo do acumulador for maior ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≥ 0, AI recebe EE)."
    },
    {
        "code": 54,
        "symbol": "DNE",
        "help": "Se o contéudo do acumulador for menor do que zero, desvie a execução  para o endereço EE. (Se [AC] &lt; 0, AI recebe EE.)"
    },
    {
        "code": 55,
        "symbol": "DNZ",
        "help": "Se o contéudo do acumulador for menor ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≤ 0, AI recebe EE)."
    },
    {
        "code": 56,
        "symbol": "DDZ",
        "help": "Se o contéudo do acumulador for diferente de zero, desvie a execução  para o endereço EE. (Se [AC] 6 = 0, AI recebe EE)."
    },
    {
        "code": 57,
        "symbol": "DZZ",
        "help": "Se o contéudo do acumulador for igual a zero, desvie a execução para o  endereço EE. (Se [AC] = 0, AI recebe EE)."
    },
    {
        "code": 58,
        "symbol": "DDF",
        "help": "Se o conteudo do acumulador for diferente de infinito, desvie a  execução para o endereço EE. (Se [AC] 6 = INF, AI recebe EE)."
    },
    {
        "code": 59,
        "symbol": "DFF",
        "help": "Se o conteudo do acumulador for infinito, desvie a execução para o  endereço EE. (Se [AC] = INF, AI recebe EE)."
    },
    {
        "code": 61,
        "symbol": "ADE",
        "help": "Desloque os digitos do acumulador uma posição à esquerda, desprezando  o digito mais significativo."
    },
    {
        "code": 62,
        "symbol": "ADD",
        "help": "Desloque os digitos do acumulador uma posição à direita, desprezando  o digito menos significativo."
    },
    {
        "code": 70,
        "symbol": "PAR",
        "help": "Pare a execução do programa. OBS.: Esta instrução deve ser executada para encerrar a execução do programa"
    }
  ]
