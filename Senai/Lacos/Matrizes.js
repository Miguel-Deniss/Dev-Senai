let alunos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

for(let i = 0; i < alunos.length; i++){
  let soma = 0;
  
  for(let j = 0; j < alunos.length; j++){
    soma += alunos[i][j];
  }
  
  let media = soma / alunos[i].length;
  console.log("Media do aluno", i + 1, ":", media);
}