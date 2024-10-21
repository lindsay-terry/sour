import { createBrowserRouter } from "react-router-dom";

import App from './App';
import Callback from './endpoints/Callback';
import Error from './endpoints/Error';
import Home from './endpoints/Home';
import TopTracks from './endpoints/TopTracks';
import TopArtists from './endpoints/TopArtists';
import Signup from './endpoints/Signup';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/callback',
                element: <Callback />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/top-tracks',
                element: <TopTracks />
            },
            {
                path: '/top-artists',
                element: <TopArtists />
            }
        ]
    }
]);

export default router;