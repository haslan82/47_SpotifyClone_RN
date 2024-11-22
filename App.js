import {AlbumsProvider} from './src/context/AlbumContext';
import {ArtistProvider} from './src/context/ArtistContext';
import { ProfileProvider } from './src/context/ProfileContext';
import Router from './src/navigation/Router';

const App = () => {
  return (
   <ProfileProvider>
     <ArtistProvider>
      <AlbumsProvider>
        <Router />
      </AlbumsProvider>
    </ArtistProvider>
   </ProfileProvider>
  );
};

export default App;
