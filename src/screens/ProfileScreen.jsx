import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ProfileContext } from '../context/ProfileContext';
import round from 'lodash/round';




const ProfileScreen = () => {
  const {profilData,error,loading} = useContext(ProfileContext);

const {name, image_url, followers_count, public_playlists} = profilData;


const formatFollowers = count => {
  if (count >= 1000000) {
    return `${round(count / 1000000, 1)}M`;
  }
  if (count >= 1000) {
    return `${round(count / 1000, 1)}K`;
  }
};


  return (
    <LinearGradient colors={['#040306', '#131624', '#192f6a']}
    style={styles.linearGradient}>
      <ScrollView style={{marginTop:50}}>
<View style={{padding:15}}>
  <View style={styles.profileContainer}>
  <Image source={{uri:image_url}} style={styles.profilImage} />
 

<View style={styles.view}>
<Text style={styles.profileName}>{name} </Text>
<Text style={styles.profileFollowers}>{formatFollowers(followers_count)} </Text>
</View>
</View>
</View>
<Text style={{color:'white', fontSize:20, marginHorizontal:12, fontWeight:'500'}}>Your Playlist</Text>
<View style={styles.playlistContainer}>
{
  public_playlists.map(playlist=>(
    <View key={playlist.uri}
    style={{
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    }}>
      <Image source={{uri:'https://picsum.photos/200/300'}} style={styles.playlistImage} />
      <View style={styles.playlistView} >
        <Text ellipsizeMode='head'   style={styles.playlistName}>{playlist.name.length > 20
          ? `${playlist.name.substring(0, 27)}...`
          : playlist.name}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={styles.playlistText}>{formatFollowers(followers_count)}</Text>
          <Text style={{marginLeft:5, color:'white'}}>followers</Text>
          </View>
      </View>
    </View>
  ))
}
</View>
      </ScrollView>
    </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  linearGradient:{
    flex: 1,
    
   /*  paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: '#040306' */
  },
  profileContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
    gap:10
  },
  profilImage:{
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode:'cover'
  },
  profileName:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff'
  },
  profileFollowers:{
    fontSize: 16,
    color: 'gray',
    marginTop: 5
  },
  playlistContainer:{
    marginTop:10,
    marginBottom:10,
    paddingHorizontal:10,

    borderRadius:10,
    overflow:'hidden'
  },
  playlistImage:{
    width: 100,
    height: 100,
    borderRadius:20,
    marginBottom:5,
    resizeMode:'cover',
    marginRight:5
  },
  playlistView:{
    flexDirection:'column',
    backgroundColor:'#33006F',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    width: 280,
    height: 60,
    borderRadius:10,
    overflow:'hidden'
  },
  playlistText:{
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 5,
    
   
  
  },
  playlistName:{
    fontSize: 18,
    fontWeight: '500',
    color: '#fff'
  }


})