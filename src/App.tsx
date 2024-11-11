import React, { useState } from "react";
import { FileUpload } from "./components/FileUpload";
import { JobDescription } from "./components/JobDescription";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { parsePDF } from "./utils/pdfParser";
import { calculateScore, ScoringResult } from "./utils/scoreCalculator";
import { Scan } from "lucide-react";
import { ResumeDescription } from "./components/ResumeDescription";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      const text = await parsePDF(file);
      console.log("Resume Text", text);
      setResumeText(text);
      if (jobDescription) {
        const result = calculateScore(text, jobDescription);
        setScoringResult(result);
      }
    } catch (err) {
      setError("Error reading PDF file. Please try again.");
      console.error("Error reading file:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    if (resumeText && value) {
      const result = calculateScore(resumeText, value);
      setScoringResult(result);
    }
  };

  const handleResumeDescriptionChange = (value: string) => {
    setResumeText(value);
    if (jobDescription && value) {
      const result = calculateScore(value, jobDescription);
      setScoringResult(result);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="flex items-center justify-center mb-2 text-3xl font-bold text-gray-900">
            <Scan className="w-8 h-8 mr-2 text-blue-500" />
            ATS Resume Scanner
          </h1>
          <p className="text-gray-600">
            Check how well your resume matches the job description
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FileUpload onFileSelect={handleFileSelect} />
            <ResumeDescription
              value={resumeText}
              onChange={handleResumeDescriptionChange}
            />
            <JobDescription
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
          </div>

          <div>
            {loading && (
              <div className="text-center text-gray-600">
                Analyzing resume...
              </div>
            )}

            {error && (
              <div className="p-4 text-center text-red-600 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            {scoringResult && !loading && !error && (
              <ScoreDisplay
                score={scoringResult.score}
                matchedKeywords={scoringResult.matchedKeywords}
                missingKeywords={scoringResult.missingKeywords}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
