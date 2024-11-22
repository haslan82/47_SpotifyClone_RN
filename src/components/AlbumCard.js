import { useNavigation } from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

const AlbumCard = ({album}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}
    onPress={()=>navigation.navigate('Info',{album})}
    >
      <Image source={{uri: album.coverArt}} style={styles.albumImage} />
      <Text numberOfLines={1} style={styles.albumName} >{album.name} </Text>
      <Text style={styles.albumArtist} >{album.artist} </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumImage: {
    width: 110,
    height: 100,
    borderRadius: 10,
    margin: 10,
    marginLeft: 0,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  container:{
    backgroundColor: '#9C82B8',
    borderRadius: 10,
    margin: 5,
    width: 120,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  albumName:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    textAlign:'center'
  },
  albumArtist:{
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    textAlign:'center'
  },
});
