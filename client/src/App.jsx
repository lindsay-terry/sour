import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <div>
      <Header />
      <Outlet />        
    </div>  
  )
}
