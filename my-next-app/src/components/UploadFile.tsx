import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadButton = () => {
  return (
    <div className="border border-dashed border-gray-400 w-full h-14 flex justify-center items-center">
      <Button
        variant="text"
        startIcon={<CloudUploadIcon className="text-orange-500" />}
        className="text-orange-500 hover:bg-transparent"
        component="label"
      >
        Upload Photo
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </div>
  );
};

export default UploadButton;
