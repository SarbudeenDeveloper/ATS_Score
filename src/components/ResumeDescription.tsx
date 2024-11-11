import React from "react";

interface ResumeDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ResumeDescription: React.FC<ResumeDescriptionProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Resume Description
      </label>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the resume description here..."
      />
    </div>
  );
};
