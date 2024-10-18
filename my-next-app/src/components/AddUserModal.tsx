"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, InputLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// type Permission = {
//     name: string
//     action: string
//     subject: string 
// }

type Role = {
    id: number
    name: string;
    actions: string[]; // Assuming you are passing an array of permission IDs
  };


function AddUserModal() {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ formData, setFormData ] = React.useState({
        name: '',
        email: '',
        location: '',
        phone_number: '',
        password: '',
    });
    const [error, setError ] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [success, setSuccess ] = React.useState<string | null>(null);
    const [restaurantId, setRestaurantId] = React.useState<string | null>(null);
    const [ selectRole, setSelectRole ] = React.useState<string | undefined>(undefined);
    const [roles, setRoles] = React.useState([]);

    const handleSelectRole = (event: SelectChangeEvent) => {
        setSelectRole(event.target.value as string);
    }

    useEffect(() => {
        const fetchRoles = async () => {
          setLoading(true);
          try {
            // Make the fetch request
            const response = await fetch('/api/roles');
            
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
              throw new Error('Failed to fetch roles');
            }
    
            // Parse the JSON data
            const data = await response.json();
            setRoles(data.roles); // Set the roles state
          } catch (err) {
            console.log(err); // Set the error state
          } finally {
            setLoading(false); // Set loading to false
          }
        };
    
        fetchRoles();  // Call the fetch function
      }, [restaurantId]);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedRestaurantId = localStorage.getItem('restaurantId');
        setRestaurantId(storedRestaurantId);
      }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);


    
        const res = await fetch('/api/admins/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...formData, roleId: selectRole, restaurantId })
        })
    
        const data = await res.json()
        if (res.ok) {
          if (data.success) {
            setSuccess('User Created Successfully');
          } else {
            setError("Failed to create User");
          }
        } else {
          console.log("Network error")
        }
      }

      console.log(loading);

    return (
        <div className=''>
          <Button variant='contained' 
          sx={{
            backgroundColor: '#FF8100',
            marginLeft: 2,
          }}
          onClick={handleOpen}
          >
            Add User
          </Button>
          <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='border-white rounded-lg'>
              <form onSubmit={handleSubmit} className='flex flex-col items-center relative w-full'>
                <div className='flex flex-col gap-5 w-[100%] items-center'>
                  {/* <h1 className='font-sans text-2xl text-gray6 text-center mt-10 mb-5'>Add User</h1> */}
                  <TextField
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    className='w-[426px]'
                  />
                  <TextField
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    className='w-[426px]'
                  />
                  <TextField
                    label="Location"
                    name="location"
                    onChange={handleChange}
                    className='w-[426px]'
                  />
                  <TextField
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    className='w-[426px]'
                  />
                  <TextField
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    className='w-[426px]'
                  />
                </div>
                <div className='flex justify-between items-center w-full mt-5'>
                    <FormControl className='w-60'>
                        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectRole}
                          label="Age"
                          onChange={handleSelectRole}
                        >
                        {roles?.map((role: Role) => (
                            <MenuItem 
                                key={role.id}
                                value={role.id}
                            >{role.name}</MenuItem>

                        ))}
                      </Select>
                    </FormControl>
                  <Button type='submit' variant='contained' 
                    sx={{
                      backgroundColor: '#FF8100',
                      padding: 2,
                      paddingInline: 6
                    }}
                    className='bg-orange2 p-4 px-14'
                    >
                      Add
                    </Button>
                </div>
                {error && (<p className='text-red-600'>{error}</p>)}
                {success && (<p className='text-green-600'>{success}</p>)}
              </form>
            </Box>
          </Modal>
        </div>
          
  )
}

export default AddUserModal
