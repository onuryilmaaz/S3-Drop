"use client";
import { useState } from "react";
import ProgressBar from "@/ui/upload/ProgressBar-form";
import FilePreview from "@/ui/upload/FilePreview-form.js";
import useAuthUser from "@/app/hooks/use-auth-user";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [keyValue, setKeyValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [copied, setCopied] = useState(false);
    const user = useAuthUser();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !user) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", user.name);

        try {
            const response = await fetch("/api/s3-upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data.status);
            setUploading(false);

            const key = `deneme/${user.name}/${data.fileName}`;
            setKeyValue(key);
            setShowPopup(true);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(keyValue);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setShowPopup(false);
        }, 200); // 2 seconds
    };

    return (
        <>
            <br /><br /><br /><br /><br /><br /><br />
            <div className="flex items-center justify-center w-full mb-8">
                <form onSubmit={handleSubmit} onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} className="w-full max-w-lg">
                    <div className="flex flex-col items-center justify-center w-full mb-">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-white-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-gray-200">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <input id="dropzone-file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or <strong className="text-primary">drag</strong> and <strong className="text-primary">drop</strong>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size: 5MB)</p>
                            </div>
                        </label>
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" disabled={!file || uploading}>
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
            {file && <FilePreview file={file} removeFile={() => setFile(null)} />}
            {uploading && <ProgressBar />}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                        <div className="flex items-center gap-4">
                            <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fillRule="evenodd" />
                                </svg>
                            </span>
                            <p className="font-medium sm:text-lg">File Uploaded!</p>
                        </div>
                        <p className="mt-4 text-gray-500">
                            Your file has been uploaded successfully! The key for the uploaded file is:
                        </p>
                        <p className="mt-2 text-gray-500 font-mono">{keyValue}</p>
                        <div className="mt-6 sm:flex sm:gap-4">
                            <button onClick={copyToClipboard} className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto">
                                Copy Key
                            </button>
                            {copied && <p className="text-green-500 mt-2 sm:mt-0 sm:ml-4">Copied!</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadForm;
