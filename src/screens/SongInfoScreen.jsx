import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SongInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // homescreen den gönderilen veriyi useroute ile aldık
  const {album} = route.params || {};
  const {coverArt, name, artist, year} = album;

  return (
    <LinearGradient
      colors={['#040306', '#131624', '#192f6a']}
      style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.imageWiew}>
            <Image source={{uri: coverArt}} style={styles.coverImage} />
          </View>
        </View>
        <Text style={styles.albumNameText}>{name}</Text>

        <View style={styles.artistWiew}>
          <Text style={styles.artistText}>{artist}</Text>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadButton}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </Pressable>

          <View style={styles.playButtonView}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />
            <Pressable style={styles.playButton}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={styles.infoWiew}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Album {name} </Text>
              <Text style={styles.infoText}>Artist {artist} </Text>
              <Text style={styles.infoText}>Year: {year} </Text>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 70,
  },
  view: {
    padding: 10,
  },
  imageWiew: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  albumNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 12,
  },
  artistText: {
    color: 'white',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistWiew: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  controlView: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#1DB954',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  playButtonView: {
    flexDirection: 'row',
    gap:10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  playButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  infoWiew:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  infoContainer:{
  
  },
  infoText:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
    marginBottom:5,
  },
});
