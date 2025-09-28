import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/add-movie" element={<MovieForm />} />
          <Route path="/" element={<MovieList />} />
        </Routes>
      </Router>
    
  );
}

export default App;
