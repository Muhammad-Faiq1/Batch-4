import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import configureStore from "./redux/configureStore"
import Home from "./pages/Home/Home"
import { Provider } from "react-redux"
import Layout from './Components/Layout/Layout';
import NoteEditPage from './pages/Home/NoteEditPage/NoteEditPage';
import FavoriteNotes from './pages/FavoriteNotes/FavoriteNotes';
function App() {
  return (
    <Provider store={configureStore}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path='/note/:note_id' element={<NoteEditPage />} />
            <Route path='/favorite-notes' element={<FavoriteNotes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
