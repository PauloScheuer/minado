import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Dimensions, Text } from 'react-native';

import { initialConditions } from '../utils/utils';

const Field = ({ opened, number = 0, hasBomb = false,
  exploded, flagged, onOpen, onFlag
}) => {
  const fieldStyles = [styles.field];
  const textStyles = [styles.text];
  if (opened) {
    fieldStyles.push(styles.opened);
    if (number === 1) {
      textStyles.push(styles.lowRisk);
    } else if (number === 2) {
      textStyles.push(styles.mediumRisk);
    } else if (number > 2) {
      textStyles.push(styles.highRisk);
    } else if (hasBomb && exploded) {
      fieldStyles.push(styles.exploded);
    }
  }
  let text = '';
  if (opened && number > 0) {
    text = number;
  } else if (opened && hasBomb) {
    text = '💣';
    textStyles.push(styles.emoji);
  } else if (!opened && flagged) {
    text = '🚩';
    textStyles.push(styles.emoji);
  }
  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onFlag}>
      <View style={fieldStyles}>
        {text !== '' && (
          <Text style={textStyles}>{text}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
export default Field;

const styles = StyleSheet.create({
  field: {
    width: Dimensions.get('window').width * initialConditions.fieldSize,
    height: Dimensions.get('window').width * initialConditions.fieldSize,
    backgroundColor: '#ccc',
    borderLeftColor: '#eee',
    borderTopColor: '#eee',
    borderRightColor: '#888',
    borderBottomColor: '#888',
    borderWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  opened: {
    borderWidth: 0
  },
  text: {
    fontSize: 20
  },
  lowRisk: {
    color: '#00f'
  },
  mediumRisk: {
    color: '#090',
  },
  highRisk: {
    color: '#f00'
  },
  exploded: {
    backgroundColor: '#f00'
  },
  emoji: {
    fontSize: 15
  }
});