import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchComponent() {
  return (
    <div className="flex items-center justify-center p-3">
      <div className="relative bg-white rounded-full shadow-lg flex items-center">
        {/* Search Input */}
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            sx: {
              borderRadius: '9999px', // Full-rounded corners
            },
            // startAdornment: (
            //   <InputAdornment position="start">
            //     <span className="text-gray-500 ml-3">Search</span>
            //   </InputAdornment>
            // ),
          }}
          className="text-gray-700 flex-grow"
        />

        {/* Search Button */}
        <IconButton
          color="inherit"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 absolute right-2"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}