import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';






const SongsScreen = () => {
  const [searchText, setSearchText] = useState(
    'Türkiye de popüler müzikler...',
  );
  const [searchTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTrack, setSelectedTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
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

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
      <ScrollView style={{flex: 1, marginTop: 50}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
          }}>
          <Pressable style={{marginHorizontal: 10}}>
            <Ionicons name="arrow-back" size="24" color="white" />
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
          <Text style={{color: 'white', fontSize: 13, marginTop: 5, fontWeight:'bold'}}>5 songs</Text>
        </View>

        {/* elimizdeki verileri ekrana ya map ile ya da Flatlist  ile render ederiz */}

        {loading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <FlatList
            data={searchTracks}
            keyExtractor={item => item.track.key}
            renderItem={({item}) => (
              <Pressable>
                <View style={styles.trackContainer}>
                  <Image
                    style={styles.image}
                    source={{uri: item.track.images.coverart}}
                  />
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackName}>{item.track.title} </Text>
                    <Text style={styles.artistName}>{item.track.title} </Text>
                  </View>
                  <Entypo name="controller-play" size="24" color="white" />
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
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    padding: 10,
  
    borderRadius: 5,
    borderBottomWidth:1,
    borderBlockColor:'white',
   /*  marginBottom: 10,
    alignItems:'center', */
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  trackInfo: {
    marginLeft: 10,
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
});
