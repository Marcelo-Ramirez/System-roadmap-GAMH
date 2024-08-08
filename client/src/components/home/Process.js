import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Table from './Table';

const Process = () => {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [message, setMessage] = useState('');
    const [processName, setProcessName] = useState('');
    const [folderType, setFolderType] = useState('');
    const [token, setToken] = useState('');

    const folderTypes = ['Memorandum', 'Contracts', 'Notes', 'Dispatches'];

    useEffect(() => {
        const getToken = () => {
            const tokenFromStorage = localStorage.getItem('token');
            if (tokenFromStorage) {
                return tokenFromStorage;
            }
            const cookies = document.cookie.split('; ');
            for (let cookie of cookies) {
                if (cookie.startsWith('token=')) {
                    return cookie.split('=')[1];
                }
            }
            return null;
        };

        setToken(getToken());
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage('');
            const fileURL = URL.createObjectURL(selectedFile);
            setFilePreview(fileURL);
        } else {
            setMessage('Please select a valid document');
            setFile(null);
            setFilePreview(null);
        }
    };

    const handleFileRemove = () => {
        setFile(null);
        setFilePreview(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('No file selected');
            return;
        }
        if (!processName) {
            setMessage('Please enter the process name');
            return;
        }
        if (!folderType) {
            setMessage('Please select a folder type');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('process_name', processName);
        formData.append('folder_type', folderType);

        try {
            const response = await fetch(`${window.origin}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                setMessage('File uploaded successfully');
                setFile(null);
                setFilePreview(null);
                setProcessName('');
                setFolderType('');
            } else {
                setMessage('Failed to upload file');
            }
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Start a New Process</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="processName">
                        Process Name
                    </label>
                    <input
                        type="text"
                        id="processName"
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex">
                    <div className="w-2/3 relative">
                        <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-48">
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                className="w-full h-full opacity-0 cursor-pointer absolute"
                            />
                            {!filePreview && (
                                <span className="text-gray-400">Click to select a file</span>
                            )}
                            {filePreview && (
                                <div className="w-full h-full">
                                    <button
                                        type="button"
                                        onClick={handleFileRemove}
                                        className="absolute top-0 right-0 m-2 bg-red-500 text-white rounded-full p-1 z-10"
                                    >
                                        X
                                    </button>
                                    <Worker workerUrl="/pdf.worker.min.js">
                                        <Viewer fileUrl={filePreview} />
                                    </Worker>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col justify-around items-center ml-4">
                        {folderTypes.map((type) => (
                            <div
                                key={type}
                                className={`w-full py-2 px-4 text-center border rounded-lg cursor-pointer ${folderType === type ? 'bg-slate-500 text-white' : 'bg-white text-gray-700'}`}
                                onClick={() => setFolderType(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 mt-4"
                >
                    Start Process
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
            <Table />
        </div>
    );
};

export default Process;
