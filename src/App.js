
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateEvent from './components/event/CreateEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListEvent from './components/event/ListEvent';
import Event from './components/event/Event';
import EditEvent from './components/event/EditEvent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<CreateEvent />} />
          <Route path='/list' element={<ListEvent />} />
          <Route path='/list/:id' element={<Event />} />
          <Route path='/edit/:id' element={<EditEvent />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
