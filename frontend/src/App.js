import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './Components/Create/Create';
import Footer from './Components/Footer/Footer';
import ForSale from './Components/ForSale/ForSale';
import Home from './Components/Home/Home';
import Market from './Components/Market/Market';
import Navbar from './Components/Navbar/Navbar';
import Owned from './Components/Owned/Owned';
import Tracker from './Components/Tracker/Tracker';
import { useStateContext } from './Contexts/Context';

function App() {
  const { account } = useStateContext();
  return (
    <div className="App">
      <Navbar />
      <div className='min-h-screen flex flex-col justify-between'>

        {account ? (
          <Routes>
            <Route path="/" element={<Market />} />
            <Route path="/forsale" element={<ForSale/>} />
            <Route path="/owned" element={<Owned/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/tracker" element={<Tracker/>} />
            <Route path="*" element={<h1 className='mt-20'>Route Not Found</h1>} />
          </Routes>

          ) : (
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tracker" element={<Tracker/>} />
            <Route path="*" element={<h1 className='mt-20'>Route Not Found</h1>} />
          </Routes>)}
        <Footer/>
        </div>
    </div>
  );
}

export default App;
