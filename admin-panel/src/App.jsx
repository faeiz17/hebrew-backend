// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import StoryForm from "./pages/StoryForm";
import StoryDetails from "./pages/StoryDetails";
import Exercises from "./pages/Exercises";
import ExerciseForm from "./pages/ExerciseForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Stories */}
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/new" element={<StoryForm />} />
        <Route path="/stories/edit/:id" element={<StoryForm />} />
        <Route path="/stories/:id" element={<StoryDetails />} />

        {/* Exercises */}
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/new" element={<ExerciseForm />} />
        <Route path="/exercises/edit/:id" element={<ExerciseForm />} />
      </Routes>
    </Router>
  );
};

export default App;
