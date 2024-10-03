// import { useEffect, useState } from 'react';

// function App() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [topTracks, setTopTracks] = useState([]);

// // Get API Token
// // useEffect(() => {
// //   let spotifyAuthParams = {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/x-www-form-urlencoded'
// //     },
// //     body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`
// //   }
// //   fetch('https://accounts.spotify.com/api/token', spotifyAuthParams)
// //     .then(result => result.json())
// //     .then(data => {
// //       // console.log(data.access_token)
// //       setAccessToken(data.access_token);
// //     })
// //     .catch(error => console.error(error));
// // }, []);
// const getAccessToken = () => {
//   const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   const scope = encodeURIComponent('user-top-read');

//   window.location.href=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
// };

// useEffect(() => {
//   const hash = window.location.hash;
//   if (hash) {
//     const token = hash.split('&')[0].split('=')[1];
//     setAccessToken(token);

//     window.location.hash = '';
//   }
// }, []);


// const handleSearch = () => {
//   if (accessToken) {
//     try {
//       fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       })
//         .then(result => {
//           if (!result.ok) {
//             throw new Error('Network response not OK:', result);
//           }
//           return result.json();
//         })
//         .then(data => {
//           console.log(data.items);
//           setTopTracks(data.items);
//           console.log(topTracks);
//         })
//     } catch (error) {
//       console.error('error', error);
//     }
//   } else {
//     getAccessToken();
//   }
// }


//   return (
//     <>
//       <button onClick={handleSearch}>Click me</button>
//     </>
//   )
// }

// export default App
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  

  return (
    <div>
      <Outlet />        
    </div>  
  )
}
