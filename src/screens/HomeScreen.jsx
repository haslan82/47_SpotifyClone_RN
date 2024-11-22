import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import {UriImage} from '../utils/UriImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ArtistContext} from '../context/ArtistContext';
import ArtistCard from '../components/ArtistCard';
import {AlbumContext} from '../context/AlbumContext';
import AlbumCard from '../components/AlbumCard';
import Error from '../components/Error';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {artists, loading, error} = useContext(ArtistContext);
  const {albums, loading: albumsLoading, error: albumsError,} = useContext(AlbumContext);

  // console.log(artists);

  return (
    <LinearGradient
      colors={['#040306', '#131624', '#192f6a']}
      style={styles.linearGradient}>
      {albumsLoading ? (
        <Loader/>) : albumsError ? (
          <Error error={albumsError} />
        ):
        <ScrollView
        style={{marginTop: 50}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image source={{uri: UriImage}} style={styles.headerImage} />
            <Text style={styles.headerText}>Welcome to Spotify</Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            color="white"
            size={24}
          />
        </View>
        {/* tabButtons */}

        <View style={styles.tabButtons}>
          <Pressable style={styles.pressable}>
            <Text style={styles.tabText}>Music</Text>
          </Pressable>
          <Pressable style={styles.pressable}>
            <Text style={styles.tabText}>Podcast & Shows</Text>
          </Pressable>
        </View>

        {/* 3. section */}

        <View style={{marginTop: 30}}>
          <Pressable style={styles.likedSongs}
          onPress={()=>navigation.navigate('Songs')}
          >
            <LinearGradient
              colors={['#33006F', '#FFFFFF']}
              style={{borderRadius: 20}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="heart" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.likedSongsText1}>Songs</Text>
          </Pressable>

          <Pressable style={styles.likedSongs}>
            <LinearGradient
              colors={['#33006F', '#FFFFFF']}
              style={{borderRadius: 20}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="star" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.likedSongsText}>Rock & Roll</Text>
          </Pressable>

          <Pressable style={styles.likedSongs}>
            <LinearGradient
              colors={['#33006F', '#FFFFFF']}
              style={{borderRadius: 20}}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo name="moon" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.likedSongsText1}>Caz</Text>
          </Pressable>
          <Text style={styles.title}>Your Top Artist</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {artists?.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </ScrollView>

          <View style={{height: 20}} />
          <Text style={styles.title}>Populer Albums</Text>
          <ScrollView horizontal={true}>
            {albums?.map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      
      }

      


    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  pressable: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  likedSongs: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33006F',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  likedSongsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 110,
  },
  likedSongsText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
    marginTop: 10,
  },
});
