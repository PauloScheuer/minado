const initialConditions = {
  gameHeight: 0.9,
  fieldSize: 0.06,
  difficulty: 1,
}

//retorna o número de colunas ou linhas
const getNumberOf = (total, individual) => {
  return Math.floor(total / individual);
}

//retorna o número de bombas
const getNumberOfBombs = (matrix, difficulty) => {
  const rows = matrix.length - 1;
  const columns = matrix[0].length - 1;
  return Math.floor((rows * columns) * (difficulty / 20));
}

//retorna a matriz com os campos
const createMatrix = (table, fieldSize, difficulty) => {
  const rows = getNumberOf(table.height, fieldSize) - 1;
  const columns = getNumberOf(table.width, fieldSize);
  let matrix = Array(rows).fill(Array(columns).fill({}))
    .map((row, m) => row.map((column, n) => {
      return {
        opened: false,
        number: 0,
        hasBomb: false,
        exploded: false,
        flagged: false,
        m,
        n
      }
    }));
  const numberOfBombs = getNumberOfBombs(matrix, difficulty);
  let i = 0;
  while (i < numberOfBombs) {
    putBombs(matrix);
    i++;
  }

  return matrix;
}


//põe as bombas na matriz
const putBombs = (matrix) => {
  const rows = matrix.length - 1;
  const columns = matrix[0].length - 1;
  const randomColumn = parseInt((Math.random() * (columns + 1)));
  const randomRow = parseInt((Math.random() * (rows + 1)));
  if (matrix[randomRow][randomColumn].hasBomb === true) {
    putBombs(matrix);
  } else {
    matrix[randomRow][randomColumn].hasBomb = true;
  }
}

//encontra bombas perto de um campo
const findNearBombs = (matrix, m, n) => {
  const rows = matrix.length - 1;
  const columns = matrix[0].length - 1;
  let numberOfBombs = 0;
  let i = -1;
  while (i < 2) {
    let j = -1;
    while (j < 2) {
      if (m + i >= 0 && n + j >= 0 && m + i <= rows && n + j <= columns &&
        matrix[m + i][n + j].hasBomb === true) {
        numberOfBombs++;
      }
      j++;
    }
    i++;
  }
  return numberOfBombs;
}

//limpa campos em volta de um outro
const clearNearFields = (matrix, m, n) => {
  const rows = matrix.length - 1;
  const columns = matrix[0].length - 1;
  let i = -1;
  while (i < 2) {
    let j = -1;
    while (j < 2) {
      if (m + i >= 0 && n + j >= 0 && m + i <= rows && n + j <= columns) {
        if (matrix[m + i][n + j].hasBomb === false &&
          matrix[m + i][n + j].opened === false) {
          matrix[m + i][n + j].opened = true;
          matrix[m + i][n + j].number = findNearBombs(matrix, m + i, n + j);
          if (matrix[m + i][n + j].number === 0) {
            clearNearFields(matrix, m + i, n + j);
          }
        }
      }
      j++;
    }
    i++;
  }
}


// mostra as bombas quando o usuário perdeu
const openOtherBombs = (matrix) => {
  matrix.forEach((row, m) => row.forEach((column, n) => {
    if (matrix[m][n].hasBomb) {
      matrix[m][n].opened = true;
    }
  }))
}


export { initialConditions, createMatrix, findNearBombs, clearNearFields, getNumberOfBombs, openOtherBombs }