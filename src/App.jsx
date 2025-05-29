import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Competitions from "./components/Competitions";
import Standings from "./components/Standings";
import Teams from "./components/Teams";
import UpcomingMatches from "./components/UpcomingMaches";
import LiveMatches from "./components/LiveMatches";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <UpcomingMatches />
              <LiveMatches />
              <Competitions />
            </>
          }
        />
        <Route path="/standings/:competitionCode" element={<Standings />} />
        <Route path="/teams/:competitionCode" element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;
