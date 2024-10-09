import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton, Stack } from '@mui/material';

function Footer() {
  return (
    <footer>
        <div className="absolute bottom-0 bg-black text-white w-full">
          <div className="text-center leading-loose">
            <p className='pt-5'>@2024 Pizza All Rights Reserved</p>
            <p>Terms and Conditions</p>
          </div>
          <div className="mt-5">
              <Stack direction="row" spacing={2} justifyContent="center" className="mb-10">
                    {/* Facebook */}
                    <IconButton
                      aria-label="facebook"
                      sx={{
                        backgroundColor: '#141414',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'grey',
                        },
                        borderRadius: '50%',
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                  
                    {/* LinkedIn */}
                    <IconButton
                      aria-label="linkedin"
                      sx={{
                        backgroundColor: '#141414',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'grey',
                        },
                        borderRadius: '50%',
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  
                    {/* Twitter */}
                    <IconButton
                      aria-label="twitter"
                      sx={{
                        backgroundColor: '#141414',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'grey',
                        },
                        borderRadius: '50%',
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                  
                    {/* YouTube */}
                    <IconButton
                      aria-label="youtube"
                      sx={{
                        backgroundColor: '#141414',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'grey',
                        },
                        borderRadius: '50%',
                      }}
                    >
                      <YouTubeIcon />
                    </IconButton>
                </Stack>
          </div>
        </div>
    </footer>
  )
}

export default Footer
