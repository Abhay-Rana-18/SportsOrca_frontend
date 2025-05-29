import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Standings() {
  const [standings, setStandings] = useState([]);
  const { competitionCode } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/standings/${competitionCode}`)
      .then((res) => res.json())
      .then((data) => setStandings(data.standings?.[0]?.table || []));
  }, [competitionCode]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Standings - {competitionCode}</h1>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">#</th>
            <th className="p-2">Team</th>
            <th className="p-2">Points</th>
            <th className="p-2">Won</th>
            <th className="p-2">Draw</th>
            <th className="p-2">Lost</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id} className="border-t">
              <td className="p-2">{team.position}</td>
              <td className="p-2 flex items-center gap-2">
                <img
                  src={team.team.crest}
                  alt={team.team.name}
                  className="h-5"
                />
                {team.team.name}
              </td>
              <td className="p-2">{team.points}</td>
              <td className="p-2">{team.won}</td>
              <td className="p-2">{team.draw}</td>
              <td className="p-2">{team.lost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;
