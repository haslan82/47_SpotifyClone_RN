import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.loading} >
      <ActivityIndicator style={'large'} color={'#1db954'} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#040306'
    },
})