import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  matchedKeywords,
  missingKeywords,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">ATS Score</h2>
        <div className="text-4xl font-bold mt-2" style={{ color: `hsl(${score}, 70%, 45%)` }}>
          {score}%
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-green-600 mb-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-lg font-semibold text-red-600 mb-2">
            <XCircle className="w-5 h-5 mr-2" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};