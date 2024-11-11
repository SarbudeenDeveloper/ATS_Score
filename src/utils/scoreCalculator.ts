export interface ScoringResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export function calculateScore(resumeText: string, jobDescription: string): ScoringResult {
  // Extract important keywords from job description
  const keywords = extractKeywords(jobDescription);

  // Convert resume text to lowercase for case-insensitive matching
  const lowerResumeText = resumeText.toLowerCase();

  // Find matched and missing keywords
  const matchedKeywords = keywords.filter(keyword =>
    lowerResumeText.includes(keyword.toLowerCase())
  );

  const missingKeywords = keywords.filter(keyword =>
    !lowerResumeText.includes(keyword.toLowerCase())
  );

  // Calculate score
  const score = Math.round((matchedKeywords.length / keywords.length) * 100);

  return {
    score,
    matchedKeywords,
    missingKeywords
  };
}

function extractKeywords(jobDescription: string): string[] {
  // Convert to lowercase and remove special characters
  const cleanText = jobDescription.toLowerCase().replace(/[^\w\s]/g, ' ');

  // Split into words
  const words = cleanText.split(/\s+/);

  // Filter common words and short terms
  const commonWords = new Set(['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', "other", "will", "written", "create", "what"]);
  const keywords = words.filter(word =>
    word.length > 2 && !commonWords.has(word)
  );

  // Count frequency and get unique keywords
  const frequency: { [key: string]: number } = {};
  keywords.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and get top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 50)
    .map(([word]) => word);
}