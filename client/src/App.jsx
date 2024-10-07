import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './utils/auth';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = Auth.getToken();
    if (token && !Auth.isTokenExpired()) {
        setAccessToken(token.token);
    } else {
        console.log('Token expired');
        // navigate('/');
    }
  }, [])

  return (
    <div>
      <Header accessToken={accessToken} setAccessToken={setAccessToken}/>
      <Outlet />        
    </div>  
  )
}
