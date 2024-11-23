import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const SongsScreen = () => {
  const [searchText, setSearchText] = useState(
    'Türkiye de popüler müzikler...',
  );
  const navigation = useNavigation();
  const progress = useProgress();

  const [searchTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': '70c8a80079msh184869161acb75fp1fdc9cjsnf4d08cf7a737',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      /*   console.log(response.data.tracks.hits); */
      setSearchTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      /*   console.error(error); */
      setError(error);
      setLoading(false);
    }
  };
  const setupPlayer = async () => {
    try {
      // TRACKPLAYER KÜTÜPHANESİNDEN OYNATICIYI BURADA KURDUK

      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    } catch {
      console.error('Error setting up player', error);
    }
  };
  const handlePlay = async track => {
    const trackData = {
      id: track.track.id,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log('Error setting up player', error);
    }
  };

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesaplar
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ' '}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      // müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      // müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    // isplaying değerini oynatma ve durdurma butonuna basıldığında tam tersi değerine çevir
    setIsPlaying(isPlaying);
  };
  // müziği geri alır
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  // müziği ileri alır
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'center',
            }}>
            <Pressable
              style={{marginHorizontal: 10}}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>

            <Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                  height: 40,
                  backgroundColor: '#422775',
                  borderRadius: 8,
                  marginTop: 10,
                  padding: 10,
                }}>
                <AntDesign name="search1" size="24" color="white" />
                <TextInput
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                  placeholder="Find in search songs"
                  placeholderTextColor={'white'}
                  style={{
                    fontWeight: '500',
                    width: '70%',
                    color: 'white',
                    fontSize: 16,
                  }}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Search Songs
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              5 songs
            </Text>
          </View>

          {/* elimizdeki verileri ekrana ya map ile ya da Flatlist  ile render ederiz */}

          {loading ? (
            <ActivityIndicator size={'large'} color={'white'} />
          ) : (
            <FlatList
              data={searchTracks}
              keyExtractor={item => item.track.key}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      style={styles.image}
                      source={{uri: item.track.images.coverart}}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title} </Text>
                      <Text style={styles.artistName}>{item.track.title} </Text>
                    </View>
                    <Entypo name="controller-play" size={24} color="white" />
                  </View>
                </Pressable>
              )}
              /* scrolview ve flatlist in beraber kullanımından kaynaklı hata verdi => çözümü  */
              getItemLayout={(data, index) => ({
                length: 80, // Öğenin yüksekliği
                offset: 80 * index,
                index,
              })}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            backgroundColor: '#5072A7',
            width: '100%',
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              Songs
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{marginTop: 20}}>
            <Image
              source={{uri: selectedTrack?.images.coverart}}
              style={{
                width: width * 0.95,
                height: height * 0.34,
                borderRadius: 6,
                resizeMode: 'stretch ',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text style={{fontSize: 14, color: 'white', marginTop: 5}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>
              <AntDesign name="heart" color="#1db954" size={24} />
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  borderRadius: 5,
                  backgroundColor: 'gray',
                }}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 15,
                    height: 15,
                    backgroundColor: 'white',
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  trackContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBlockColor: 'white',
    /*  marginBottom: 10,
    alignItems:'center', */
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  trackInfo: {
    marginLeft: 25,
    flex: 1,
  },
  trackName: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
  artistName: {
    marginTop: 5,
    fontSize: 14,
    color: '#758496',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
