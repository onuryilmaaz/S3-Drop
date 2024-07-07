import { File, X } from 'lucide-react';

function FilePreview({ file, removeFile }) {
    return (
        <div className='flex items-center justify-between mt-5 p-4 rounded-full border border-gray-300' style={{ backgroundColor: '#E5E7EB' }}>
            <div className='flex items-center gap-4'>
                <File className='w-10 h-10 text-gray-500' />
                <div className='text-left'>
                    <h2 className='text-lg font-medium text-gray-800'>{file.name}</h2>
                    <p className='text-sm text-gray-500'>{file.type} / {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            </div>
            <X className='w-6 h-6 text-red-500 cursor-pointer' onClick={() => removeFile()} />
        </div>
    );
}

export default FilePreview;