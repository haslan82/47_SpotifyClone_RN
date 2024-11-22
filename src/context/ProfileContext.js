import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profilData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfilData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': '70c8a80079msh184869161acb75fp1fdc9cjsnf4d08cf7a737',
        /* 4881877b7fmsh063d77fae5a42d9p1be6e9jsn8d4ae58e7971 */
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      // console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfilData();
    setLoading(false);
  }, []);

  return (
    <ProfileContext.Provider value={{profilData, loading, error}}>
      {children}
    </ProfileContext.Provider>
  );
};
