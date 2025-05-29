import React, { useEffect, useState } from "react";

function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/upcoming-matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatStage = (stage) => {
    return stage.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center mb-6">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Football Matches
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest fixtures from top competitions around
            the world
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">⚽</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Upcoming Matches
            </h3>
            <p className="text-gray-600">Check back later for new fixtures</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="bg-gray-900 text-white px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={match.competition.emblem}
                      alt={match.competition.name}
                      className="w-8 h-8 object-contain bg-white rounded p-1"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-sm uppercase tracking-wide">
                        {match.competition.name}
                      </h3>
                      <p className="text-gray-300 text-xs">
                        {formatStage(match.stage)}{" "}
                        {match.group && `• ${match.group}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="relative mb-3">
                        <img
                          src={match.homeTeam.crest}
                          alt={match.homeTeam.name}
                          className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="hidden w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
                          <span className="text-gray-400 font-bold text-lg">
                            {match.homeTeam.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                        {match.homeTeam.name}
                      </h4>
                      <span className="text-xs text-gray-500 mt-1">HOME</span>
                    </div>

                    <div className="flex flex-col items-center mx-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-gray-600 font-bold text-sm">
                          VS
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="relative mb-3">
                        <img
                          src={match.awayTeam.crest}
                          alt={match.awayTeam.name}
                          className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="hidden w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
                          <span className="text-gray-400 font-bold text-lg">
                            {match.awayTeam.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                        {match.awayTeam.name}
                      </h4>
                      <span className="text-xs text-gray-500 mt-1">AWAY</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {formatDate(match.utcDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingMatches;
