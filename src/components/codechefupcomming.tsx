import React from "react";

function CodeChefUpcoming( {contest} ) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold text-blue-600">{contest.name}</h3>
      <p className="text-gray-600">Starts In: {contest.startsIn}</p>
      <a
        href={contest.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Visit Contest
      </a>
      {contest.youtubeLink!=null&&<a
        href={contest.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        youtubeLink
      </a>}
    </div>
  );
}

export default CodeChefUpcoming;
