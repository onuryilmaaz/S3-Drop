"use client";
import { useState } from "react";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/s3-upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data.status);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    return (
        <>
        {/* <h1 className="text-center mt-8 mb-4 text-2xl font-bold">Upload Files to S3 Bucket</h1> */}

        <div className="flex items-center justify-center w-full">
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex flex-col items-center justify-center w-full mb-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-white-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-gray-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or <strong className="text-primary">drag</strong> and <strong className="text-primary">drop</strong>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size: 5MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="image/*" onChange={handleFileChange} className="hidden"/>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" disabled={!file || uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    </>
    );
};

export default UploadForm;
