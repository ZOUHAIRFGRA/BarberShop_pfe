import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
// import Register from './pages/Register';
import BarbersList from './pages/BarbersList';

export default function App() {
  return (
    <>
      <Header/>
      <BarbersList/>
      <Footer />
    </>
  );

}

