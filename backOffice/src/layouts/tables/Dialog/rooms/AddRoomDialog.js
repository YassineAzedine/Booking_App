import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import api from '../../../../api/api';
import { uploadImageToCloudinary } from 'utiles/uploadImageToCloudinary';
const AddRoomDialog = ({open ,setOpen}) => {

    
    const hotelData = {
        hotelName: '66f2924f97508e59ca216032',
        imageUrl: 'https://example.com/images/cabin1.jpg',
        pricePerNight: 150,
        bedCount: 2,
        bathroomCount: 1,
        maxOccupancy: 4,
      };
      

  const [hotelName, sethotelName] = useState('66f2924f97508e59ca216032');
  const [pricePerNight, setPrice] = useState(hotelData.pricePerNight);
  const [bedCount, setBedCount] = useState(hotelData.bedCount);
  const [bathroomCount, setBathroomCount] = useState(hotelData.bathroomCount);
  const [maxOccupancy, setMaxOccupancy] = useState(hotelData.maxOccupancy);
  const [imageFile, setImageFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size exceeds the 5MB limit');
      return;
    }
  
    setImageFile(file);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Step 1: Upload the image
      const uploadedImageUrl = await uploadImageToCloudinary(imageFile);
  
      // Step 2: Submit the room data along with the image URL
      const roomData = {
        hotelName,
        pricePerNight,
        bedCount,
        bathroomCount,
        maxOccupancy,
        imageUrl: uploadedImageUrl, // Use the Cloudinary image URL
      };
  
      const response = await api.post('rooms', roomData);
      console.log('Room added successfully', response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding the room', error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Room to {hotelData.hotelName}</DialogTitle>
        <DialogContent>
          <Card>
           
            <CardContent>
              <Typography variant="h6">
                Price per Night: ${hotelData.pricePerNight}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  label="Room Name"
                  fullWidth
                  value={hotelName}
                  onChange={(e) => sethotelName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  label="Price Per Night"
                  type="number"
                  fullWidth
                  value={pricePerNight}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  label="Bed Count"
                  type="number"
                  fullWidth
                  value={bedCount}
                  onChange={(e) => setBedCount(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  label="Bathroom Count"
                  type="number"
                  fullWidth
                  value={bathroomCount}
                  onChange={(e) => setBathroomCount(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  label="Max Occupancy"
                  type="number"
                  fullWidth
                  value={maxOccupancy}
                  onChange={(e) => setMaxOccupancy(e.target.value)}
                />
                      <DialogContent>
          <Typography variant="body1">Please select a file:</Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained"  color="white" component="span">
              Choose File
            </Button>
          </label>
          {imageFile && (
            <Typography variant="body2"  color="white" sx={{ mt: 2 }}>
              Selected File: {imageFile.name}
            </Typography>
          )}
        </DialogContent>
                <Button type="submit" variant="contained" color="white">
                  Add Room
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddRoomDialog