"use client";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, FormControlLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import permissions from '@/constants/permissions.json';
import OrangeCheckbox from './OrangeCheckbox';
import { z } from 'zod';

type Permission = {
    name: string
    action: string
    subject: string 
}

interface AddRoleModalProps {
  id: string
}

function AddRoleModal({ id }: AddRoleModalProps) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 450,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ name, setName ] = React.useState('');
    const [ givenPermissions, setGivenPermissions ] = React.useState<string[]>([]);
    const [ error, setError ] = React.useState<string | null>(null);
    const [ success, setSuccess ] = React.useState<string | null>(null);
    const [ restaurandId, setRestaurantId ] = React.useState<string | null>(null);
    const [errors, setErrors] = useState<{[name: string]: string}>({});
    const label = { inputProps: { 'aria-label': 'Permissions' } };

    const roleNameSchema = z.string().min(2, 'Name too short');


    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedRestaurantId = localStorage.getItem('restaurantId');
        setRestaurantId(storedRestaurantId);
      }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleCheckboxChange = (permission: Permission) => () => {
        if (!givenPermissions.includes(permission.name)) {
          setGivenPermissions(prevState => ([...prevState, permission.name]))
        } else {
          setGivenPermissions( prevState => (prevState.filter(value => value !== permission.name)))
        }
      }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        const validation = roleNameSchema.safeParse(name);
        if (!validation.success) {
          console.log('Form is invalid:', validation.error.errors);
    
          setErrors({name: "Name is too short"});
          return;
        }
        setErrors({});

        const res = await fetch('/api/roles/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({restaurantId: id, name, actions: givenPermissions })
        })
    
        const data = await res.json()
        if (res.ok) {
          if (data.success) {
            setSuccess('Role Created Successfully');
          } else {
            setError("Failed to create Role");
          }
        } else {
          console.log("Network error")
        }
      }

    console.log(restaurandId)


    return (
        <div className=''>
          <Button variant='contained' 
            sx={{
              backgroundColor: '#FF8100',
            }}
            onClick={handleOpen}>
            + Add Role
          </Button> 
          <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='border-white rounded-lg'>
              <form onSubmit={handleSubmit} className='w-[90%]'>
                <div>
                  <h1 className='font-sans text-2xl text-gray6 text-center mt-10 mb-5'>Add Role</h1>
                  {errors.name && <p className='text-red-500 text-sm ml-2'>{errors.name}</p>}
                  <TextField
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    className='w-[50vw] max-w-96'/>
                </div>
                <div className='mx-24 mt-5'>
                  <h2 className='font-sans text-xl text-gray3 mt-2 mb-2'>Actions</h2>
                  <div className="flex flex-wrap w-full mb-5">
                    {permissions.map((permission: Permission) => (
                      <FormControlLabel
                        key={permission.name}
                        label={permission.name}
                        control={
                            <OrangeCheckbox 
                              checked={givenPermissions.includes(permission.name)}
                              {...label} 
                            onChange={handleCheckboxChange(permission)}
                          />
                        }
                      />
                    ))}
            
                  </div>
                </div>
                <div className='flex justify-center items-center w-full mt-5'>
                  <Button type='submit' variant='contained' sx={{
                    backgroundColor: '#FF8100'
                  }}
                  >
                    Update
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

export default AddRoleModal
