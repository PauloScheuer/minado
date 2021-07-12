import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { initialConditions } from '../utils/utils';

const Header = ({ flags, onRestart, difficulty = 1, onSetDifficulty }) => {
  const difficultStyle = [styles.difficult];
  if (difficulty === 1) {
    difficultStyle.push(styles.easy);
  } else if (difficulty === 2) {
    difficultStyle.push(styles.normal);
  } else {
    difficultStyle.push(styles.hard);
  }
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.title}>Campo Minado</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.subtitle}>{flags} 🚩</Text>
        <TouchableOpacity onPress={onRestart} style={styles.button}>
          <Feather name="refresh-ccw" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSetDifficulty}>
          <Text style={difficultStyle}>
            {difficulty === 1 ? 'Fácil' : difficulty === 2 ? 'Médio' : 'Difícil'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Header;

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('window').height * (1 - initialConditions.gameHeight),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    width: Dimensions.get('window').width / 6
  },
  button: {
    width: Dimensions.get('window').width / 6
  },
  left: {
    flex: 1,
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    flex: 1
  },
  easy: {
    color: '#00f'
  },
  normal: {
    color: '#090',
  },
  hard: {
    color: '#f00'
  },
});