import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Field from './Field';

import { initialConditions } from '../utils/utils';

const Table = ({ matrix, onOpen, onFlag }) => {
  return (
    <View style={styles.table}>
      {matrix.map(row => {
        return row.map(({ opened, number, hasBomb, exploded, flagged, m, n }, i) => {
          return <Field key={i}
            opened={opened}
            hasBomb={hasBomb}
            number={number}
            exploded={exploded}
            flagged={flagged}
            onOpen={() => onOpen(m, n)}
            onFlag={() => onFlag(m, n)} />

        })
      })}
    </View>
  );
}
export default Table;

const styles = StyleSheet.create({
  table: {
    height: Dimensions.get('window').height * initialConditions.gameHeight,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});