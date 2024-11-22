import axios from 'axios';

import {Children, createContext, useEffect, useState} from 'react';

const ArtistContext = createContext();

const ArtistProvider = ({children}) => {
  const [artists, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtist = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'türkiye de popüler olanlar',
        type: 'artists',
        offset: '0',
        limit: '15',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': '70c8a80079msh184869161acb75fp1fdc9cjsnf4d08cf7a737',
        /* 4881877b7fmsh063d77fae5a42d9p1be6e9jsn8d4ae58e7971 */
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      // console.log(data);
      setArtist(data);
      setLoading(false);

      // console.log(response.data);
    } catch (error) {
      // console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtist();
    setLoading(false);
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export {ArtistContext, ArtistProvider};
