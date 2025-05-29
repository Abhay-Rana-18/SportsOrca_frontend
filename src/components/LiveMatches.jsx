import { useEffect, useState } from "react";
import axios from "axios";

const MatchSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
    </div>

    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="h-5 bg-gray-200 rounded w-24"></div>
      </div>

      <div className="text-center">
        <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-8 mx-auto"></div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="h-5 bg-gray-200 rounded w-24"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
      <div className="h-4 bg-gray-200 rounded w-28"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

const MatchCard = ({ match }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200";
      case "finished":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTime = (timeString) => {
    try {
      return new Date(timeString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return timeString;
    }
  };

  return (
   <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {match.tournament}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
            match.status
          )} self-start sm:self-auto`}
        >
          {match.status}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
        {/* Home Team */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs sm:text-sm font-bold">
              {match.homeTeam?.charAt(0) || "H"}
            </span>
          </div>
          <span className="font-semibold text-gray-900 text-sm sm:text-base truncate min-w-0" title={match.homeTeam}>
            {match.homeTeam}
          </span>
        </div>

        {/* Score */}
        <div className="text-center sm:mx-4 lg:mx-6 flex-shrink-0 order-last sm:order-none">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {match.score || "- : -"}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {match.status === "live" ? "LIVE" : "Score"}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 justify-start sm:justify-end min-w-0">
          <span className="font-semibold text-gray-900 text-sm sm:text-base truncate min-w-0 sm:order-2" title={match.awayTeam}>
            {match.awayTeam}
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 sm:order-3">
            <span className="text-white text-xs sm:text-sm font-bold">
              {match.awayTeam?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-100 space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Start:</span>{" "}
          {formatTime(match.startTime)}
        </div>
        {match.status === "live" && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium text-red-600">Live Now</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:5000/api/live-matches"
        );
        setMatches(response.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    setVisibleCount(matches.length);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleCount(3);
  };

  const displayedMatches = showAll ? matches : matches.slice(0, visibleCount);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Matches
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Live Matches
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Stay updated with real-time match information
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-1">
          {[...Array(4)].map((_, index) => (
            <MatchSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {matches.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No Live Matches
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                There are currently no live matches available.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Refresh
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-1">
                {displayedMatches.map((match, index) => (
                  <MatchCard key={match.id || index} match={match} />
                ))}
              </div>

              {/* Show More/Less Button */}
              {matches.length > 3 && (
                <div className="text-center mt-6 sm:mt-8">
                  {!showAll ? (
                    <button
                      onClick={handleShowMore}
                      className="bg-blue-700/70 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto text-sm sm:text-base"
                    >
                      <span>Show More Matches</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span className="bg-blue-400/70 text-xs px-2 py-1 rounded-full ml-2">
                        +{matches.length - visibleCount}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleShowLess}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto text-sm sm:text-base"
                    >
                      <span>Show Less</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
