import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import './Documents.scss';

interface DocumentUploadProps {
    onUploadComplete: (files: File[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadComplete }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            // Simulate upload
            console.log('Uploading files:', selectedFiles);
            onUploadComplete(selectedFiles);
            setSelectedFiles([]);
        }
    };

    const formatFileSize = (bytes: number): string => {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    return (
        <div className="document-upload">
            <h3>Upload Documents</h3>

            <div
                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Upload size={48} />
                <p>Drag and drop files here</p>
                <span>or</span>
                <label className="upload-button">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    Browse Files
                </label>
                <small>Supported: PDF, DOCX, ZIP, JPG, PNG (Max 50MB)</small>
            </div>

            {selectedFiles.length > 0 && (
                <div className="selected-files">
                    <h4>Selected Files ({selectedFiles.length})</h4>
                    <div className="file-list">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="file-item">
                                <File size={20} />
                                <div className="file-info">
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">{formatFileSize(file.size)}</span>
                                </div>
                                <button onClick={() => removeFile(index)} className="remove-file">
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleUpload} className="upload-submit-button">
                        Upload {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;