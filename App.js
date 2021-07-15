import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Header from './src/components/Header';
import Table from './src/components/Table';

import { initialConditions, createMatrix, findNearBombs, clearNearFields, getNumberOfBombs, openOtherBombs } from './src/utils/utils';

const App = () => {
  const [matrix, setMatrix] = useState(createMatrix({
    height: Dimensions.get('window').height * initialConditions.gameHeight,
    width: Dimensions.get('window').width
  },
    Dimensions.get('window').width * initialConditions.fieldSize,
    initialConditions.difficulty
  ));
  const [difficulty, setDifficulty] = useState(initialConditions.difficulty);
  const [numberOfBombs, setNumberOfBombs] = useState(getNumberOfBombs(matrix, difficulty));
  const [bombsFlagged, setBombsFlagged] = useState(0);
  const [falseFlags, setFalseFlags] = useState(0);

  const handleOpenField = (m, n) => {
    const newMatrix = [...matrix];
    if (newMatrix[m][n].hasBomb) {
      newMatrix[m][n].exploded = true;
      handleLose();
    } else {
      if (newMatrix[m][n].flagged) handlePutFlag(m, n);
      newMatrix[m][n].number = findNearBombs(newMatrix, m, n);
      if (newMatrix[m][n].number === 0) {
        clearNearFields(newMatrix, m, n);
      }
    }
    newMatrix[m][n].opened = true;
    setMatrix(newMatrix);
  }

  const handlePutFlag = (m, n) => {
    const newMatrix = [...matrix];
    if (newMatrix[m][n].opened) {
      return;
    }
    if (!newMatrix[m][n].flagged) {
      newMatrix[m][n].flagged = true;
      if (newMatrix[m][n].hasBomb) {
        const newBombsFlagged = bombsFlagged + 1;
        setBombsFlagged(newBombsFlagged);
      } else {
        const newFalseFlags = falseFlags + 1;
        setFalseFlags(newFalseFlags);
      }
    } else {
      newMatrix[m][n].flagged = false;
      if (newMatrix[m][n].hasBomb) {
        const newBombsFlagged = bombsFlagged - 1;
        setBombsFlagged(newBombsFlagged);
      } else {
        const newFalseFlags = falseFlags - 1;
        setFalseFlags(newFalseFlags);
      }
    }
    setMatrix(newMatrix);
  }

  const handleWin = () => {
    Alert.alert(
      "Parabéns!",
      "Você venceu!",
      [
        {
          text: "Fechar",
          style: "cancel"
        },
        { text: "Novo jogo", onPress: handleRestart }
      ]
    );
  }

  const handleLose = () => {
    const newMatrix = [...matrix];
    openOtherBombs(newMatrix);
    setMatrix(newMatrix);
    Alert.alert(
      "Iiih!",
      "Você perdeu!",
      [
        {
          text: "Fechar",
          style: "cancel"
        },
        { text: "Novo jogo", onPress: handleRestart }
      ]
    );
  }

  const handleRestart = () => {
    setMatrix(createMatrix({
      height: Dimensions.get('window').height * initialConditions.gameHeight,
      width: Dimensions.get('window').width
    },
      Dimensions.get('window').width * initialConditions.fieldSize,
      difficulty
    ));
    setNumberOfBombs(getNumberOfBombs(matrix, difficulty));
    setBombsFlagged(0);
    setFalseFlags(0);
  }

  const handleSetDifficulty = () => {
    if (difficulty < 3) {
      setDifficulty(difficulty + 1);
    } else {
      setDifficulty(1)
    }
  }

  useEffect(() => {
    handleRestart();
  }, [difficulty]);

  useEffect(() => {
    if ((numberOfBombs === bombsFlagged) &&
      (falseFlags === 0)) {
      handleWin();
    }
  }, [bombsFlagged, falseFlags]);

  return (
    <View style={styles.container}>
      <Header flags={numberOfBombs - bombsFlagged - falseFlags} onRestart={handleRestart} difficulty={difficulty} onSetDifficulty={handleSetDifficulty} />
      <Table matrix={matrix} onOpen={handleOpenField} onFlag={handlePutFlag} />
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
