// Constantes
const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;
 //dados dos alunos (nome e notas)
const nomeAluno = "João";
const notas = [8, 7];

function calcularMedia(valores) {
  const soma = valores.reduce((acc, n) => acc + n, 0);
  return soma / valores.length;
}

function classificarSituacao(media) {
  if (media >= MEDIA_APROVACAO) return "Aprovado";
  if (media >= MEDIA_RECUPERACAO) return "Recuperação";
  return "Reprovado";
}

const media = calcularMedia(notas);
const situacao = classificarSituacao(media);

console.log("Nome do aluno:", nomeAluno);
notas.forEach((nota, i) => console.log(`Nota ${i + 1}:`, nota));
console.log("Média do aluno:", media);
console.log("Situação:", situacao);