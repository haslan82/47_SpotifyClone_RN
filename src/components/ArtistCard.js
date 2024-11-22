import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ArtistCard = ({artist}) => {
  return (
   <TouchableOpacity>
    <View style={styles.artistContainer}>
        <Image source={{uri:artist.data.visuals.avatarImage?.sources[0].url}} 
        style={styles.artistImage}
        />
        <Text numberOfLines={1} style={styles.artistName} >{artist.data.profile.name} </Text>
    </View>
   </TouchableOpacity>
  )
}

export default ArtistCard

const styles = StyleSheet.create({
    artistContainer:{
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        width: 100  
    },
    artistImage:{
        width: 100,
        height: 90,
        borderRadius: 100,
        marginTop:5
       
        
    },
    artistName:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft:5,
        textAlign:'center'
    }
})