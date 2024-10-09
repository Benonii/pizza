import React from 'react';
import { TextField, IconButton } from '@mui/material';
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
          sx={{
            backgroundColor: "#ff8100",
            padding: 2,
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            position: 'absolute',
            right: '0.5rem',
            color: 'white'
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}