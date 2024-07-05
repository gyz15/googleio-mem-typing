// INFO:    LevenShteinDistance function compares two strings and return similarity percentage (TBD)

export const levenshteinDistance = (inputStr, checkStr) => {
  const m = inputStr.length;
  const n = checkStr.length;

  // Initialize the matrix
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = inputStr[i - 1] === checkStr[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[m][n];
};

// // Example usage
// const inputStr = "kitten";
// const checkStr = "sitting";
// console.log(levenshteinDistance(inputStr, checkStr));  // Output: 3
