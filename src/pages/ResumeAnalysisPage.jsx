


// src/pages/ResumeAnalysisPage.jsx
import React, { useState } from 'react';
import UploadZone from '../components/ResumeAnalyser/UploadZone';
import AnalysisStatus from '../components/ResumeAnalyser/AnalysisStatus';
import ResultTabs from '../components/ResumeAnalyser/ResultTabs';

export default function ResumeAnalysisPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState({
    score: 0,
    strengths: [],
    improvements: [],
    keywords: [],
    sections: {}
  });
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };
  
  // Process files
  const handleFiles = (files) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      // Check if file is PDF
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setIsUploaded(true);
        analyzeResume(selectedFile);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };
  
  // Mock analyze function
  const analyzeResume = (file) => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        score: 78,
        strengths: [
          'Clear professional experience section',
          'Good use of action verbs',
          'Relevant skills highlighted'
        ],
        improvements: [
          'Add more quantifiable achievements',
          'Consider adding a summary section',
          'Improve formatting consistency'
        ],
        keywords: ['React', 'JavaScript', 'UI/UX', 'Project Management', 'Agile'],
        sections: {
          contact: { score: 90, feedback: 'Contact information is complete' },
          education: { score: 85, feedback: 'Education details are well presented' },
          experience: { score: 75, feedback: 'Good structure but add more metrics' },
          skills: { score: 80, feedback: 'Relevant skills included' },
          projects: { score: 65, feedback: 'Projects need more details' }
        }
      });
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };
  
  // Reset state for reupload
  const handleReupload = () => {
    setFile(null);
    setIsUploaded(false);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults({
      score: 0,
      strengths: [],
      improvements: [],
      keywords: [],
      sections: {}
    });
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Resume Analyzer</h1>
      
      {!isUploaded ? (
        <UploadZone 
          isDragging={isDragging}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
        />
      ) : (
        <div className="space-y-6">
          <AnalysisStatus 
            file={file}
            isAnalyzing={isAnalyzing}
            handleReupload={handleReupload}
          />
          
          {analysisComplete && <ResultTabs analysisResults={analysisResults} />}
        </div>
      )}
    </div>
  );
}