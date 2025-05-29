import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Teams() {
  const { competitionCode } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/teams/${competitionCode}`)
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []));
  }, [competitionCode]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teams in {competitionCode}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition"
          >
            <img
              src={team.crest}
              alt={team.name}
              className="h-12 mx-auto mb-2"
            />
            <h2 className="text-sm font-semibold">{team.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
