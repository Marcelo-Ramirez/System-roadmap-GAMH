import React, { useState } from 'react';

const Process = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(selectedFile);
            setMessage('');
        } else {
            setMessage('Please select a PDF or Word document');
            setFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${window.origin}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('File uploaded successfully');
            } else {
                setMessage('Failed to upload file');
            }
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 mb-4"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500"
                >
                    Upload
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default Process;
