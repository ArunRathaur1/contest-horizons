const ContestCard = (contest ) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-80 text-center border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        {contest.contestName}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{contest.time}</p>
      <p className="text-md font-medium text-blue-600 mt-2">
        Starts In: {contest.startsIn}
      </p>
      <a
        href={contest.contestLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Join Contest
      </a>
    </div>
  );
};

export default ContestCard;