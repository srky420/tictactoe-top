function Stats() {
  const stats = [
    {
      name: "Player X",
      score: 0,
    },
    {
      name: "Player O",
      score: 0,
    },
  ];

  // Increase provided player's score
  const increaseScore = (player) => (stats[player].score += 1);

  // Get stats
  const getStats = () => stats;

  // Set player name
  const setPlayerNames = (playerOne, playerTwo) => {
    stats[0].name = playerOne;
    stats[1].name = playerTwo;
  };

  return {
    increaseScore,
    getStats,
    setPlayerNames,
  };
}
