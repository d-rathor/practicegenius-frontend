"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useWorksheets, Worksheet } from '@/contexts/WorksheetContext';

export default function EditWorksheetPage() {
  const params = useParams();
  const router = useRouter();
  const { worksheets, addWorksheet, deleteWorksheet } = useWorksheets();
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [plan, setPlan] = useState('');
  const [topic, setTopic] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [originalWorksheet, setOriginalWorksheet] = useState<Worksheet | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load worksheet data
  useEffect(() => {
    if (params.id) {
      const foundWorksheet = worksheets.find(w => w.id === params.id);
      if (foundWorksheet) {
        setOriginalWorksheet(foundWorksheet);
        setTitle(foundWorksheet.title);
        setSubject(foundWorksheet.subject);
        setGrade(foundWorksheet.grade.toString());
        setPlan(foundWorksheet.subscriptionLevel);
        setTopic(foundWorksheet.topic || '');
        setFileName(foundWorksheet.fileName);
      } else {
        // Worksheet not found, redirect to worksheets list
        router.push('/admin/worksheets');
      }
      setLoading(false);
    }
  }, [params.id, worksheets, router]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      
      // Check file size (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size should not exceed 10MB');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      
      // Create a preview URL for the PDF
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !subject || !grade || !plan) {
      setError('Title, subject, grade, and plan are required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real application, you would upload the file to a server here
      // For this demo, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (originalWorksheet) {
        // Instead of deleting and re-adding, just update the existing worksheet
        // This preserves all properties and ensures the worksheet stays visible
        addWorksheet({
          ...originalWorksheet, // Keep all original properties
          title,
          subject: subject as 'math' | 'science' | 'english',
          grade: parseInt(grade),
          subscriptionLevel: plan as 'free' | 'essential' | 'premium',
          plan: plan.charAt(0).toUpperCase() + plan.slice(1), // Ensure plan is capitalized (Free, Essential, Premium)
          topic,
          fileName: file ? fileName : originalWorksheet.fileName,
          // Preserve these critical properties
          id: originalWorksheet.id,
          downloadCount: originalWorksheet.downloadCount,
          createdAt: originalWorksheet.createdAt,
          isPublic: originalWorksheet.isPublic !== false, // Ensure isPublic is preserved
          createdBy: originalWorksheet.createdBy || 'admin' // Ensure createdBy is preserved
        } as Worksheet);
        
        // Success message
        setSuccess('Worksheet updated successfully!');
        
        // Wait a moment to show the success message, then redirect
        setTimeout(() => {
          router.push(`/admin/worksheets/${originalWorksheet.id}`);
        }, 1500);
      }
    } catch (err) {
      setError('Failed to update worksheet. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      // Check if file is a PDF
      if (droppedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      
      // Check file size (limit to 10MB)
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError('File size should not exceed 10MB');
        return;
      }

      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError('');
      
      // Create a preview URL for the PDF
      const fileUrl = URL.createObjectURL(droppedFile);
      setPreviewUrl(fileUrl);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!originalWorksheet) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-center text-gray-600">Worksheet not found.</p>
                <div className="mt-4 text-center">
                  <Link
                    href="/admin/worksheets"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                  >
                    Back to Worksheets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Edit Worksheet</h2>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/worksheets/${originalWorksheet.id}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Worksheet Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="e.g. Addition and Subtraction"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                        Topic (for search)
                      </label>
                      <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="e.g. Basic Operations, Grammar, Plants"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="">Select Subject</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                        Grade
                      </label>
                      <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
                        Subscription Plan
                      </label>
                      <select
                        id="plan"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="">Select Plan</option>
                        <option value="free">Free</option>
                        <option value="essential">Essential</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current File: <span className="font-mono text-sm">{originalWorksheet.fileName}</span>
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload a new file only if you want to replace the current one.
                    </p>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="space-y-1 text-center">
                        {!file ? (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                              >
                                <span>Upload a new file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf"
                                  onChange={handleFileChange}
                                  ref={fileInputRef}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF up to 10MB</p>
                          </>
                        ) : (
                          <div className="flex flex-col items-center">
                            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="mt-2 text-sm font-medium text-gray-900">{fileName}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null);
                                setFileName('');
                                setPreviewUrl(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                }
                              }}
                              className="mt-2 text-xs text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {previewUrl && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New File Preview
                      </label>
                      <div className="mt-1 border border-gray-300 rounded-md p-2">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900">
                            {fileName}
                          </p>
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary-dark"
                          >
                            Open in new tab
                          </a>
                        </div>
                        <div className="h-64 border border-gray-200 rounded">
                          <iframe
                            src={previewUrl}
                            className="w-full h-full"
                            title="PDF Preview"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Link
                      href={`/admin/worksheets/${originalWorksheet.id}`}
                      className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
