let nomeAluno = "Miguel"
let nota1 = 8
let nota2 = 7
let nota3 = 9

let media
let resultado

media = (nota1 + nota2 + nota3) / 3

if (true) {
    if (media >= 9) {
        resultado = "Excelente"
    } else if (media >= 7) {
        resultado = "Bom"
    } else if (media >= 6) {
        resultado = "Aprovado"
    } else {
        resultado = "Reprovado"
    }
}

console.log("Aluno:", nomeAluno)
console.log("Nota 1:", nota1)
console.log("Nota 2:", nota2)
console.log("Nota 3:", nota3)
console.log("Média final:", media)
console.log("Classificação:", resultado)