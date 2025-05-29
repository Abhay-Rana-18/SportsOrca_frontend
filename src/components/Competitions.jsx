import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/competitions")
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.competitions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNavigate = (type, code) => {
    navigate(`/${type}/${code}`);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4"></div>
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </div>

        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-80 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded-md w-96"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Football Competitions
          </h1>
          <p className="text-gray-600">
            Explore leagues and tournaments from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-300"
              onMouseEnter={() => setHoveredCard(comp.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{comp.area.name}</p>

                  {comp.emblem && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={comp.emblem}
                        alt={comp.name}
                        className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div
                  className={`space-y-2 transition-all duration-300 ${
                    hoveredCard === comp.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-60 translate-y-1"
                  }`}
                >
                  <button
                    onClick={() => handleNavigate("standings", comp.code)}
                    className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    View Standings
                  </button>
                  <button
                    onClick={() => handleNavigate("teams", comp.code)}
                    className="w-full bg-white text-gray-900 py-2.5 px-4 rounded-lg font-medium border border-gray-300 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    View Teams
                  </button>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {competitions.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Competitions Available
            </h3>
            <p className="text-gray-600">
              Please check your connection and try again
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}

export default Competitions;
