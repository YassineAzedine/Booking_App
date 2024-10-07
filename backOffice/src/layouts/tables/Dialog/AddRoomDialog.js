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
import api from '../../../api/api';

const AddRoomDialog = ({open ,setOpen}) => {

    
    const hotelData = {
        hotelName: '66f2924f97508e59ca216032',
        imageUrl: 'https://example.com/images/cabin1.jpg',
        pricePerNight: 150,
        bedCount: 2,
        bathroomCount: 1,
        maxOccupancy: 4,
      };
      

  const [hotelName, sethotelName] = useState('');
  const [price, setPrice] = useState(hotelData.pricePerNight);
  const [bedCount, setBedCount] = useState(hotelData.bedCount);
  const [bathroomCount, setBathroomCount] = useState(hotelData.bathroomCount);
  const [maxOccupancy, setMaxOccupancy] = useState(hotelData.maxOccupancy);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle room addition logic here
    console.log('data',{
      hotelName,
      price,
      bedCount,
      bathroomCount,
      maxOccupancy,
      selectedFile  
    });
    api.post('rooms',{
        hotelName,
        price,
        bedCount,
        bathroomCount,
        maxOccupancy,
        selectedFile  
      })
    .then(response => setRooms(response.data.data))
    .catch(error => console.error(error));
    // Close dialog after submission
    handleClose();
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
                  label="Price"
                  type="number"
                  fullWidth
                  value={price}
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
          {selectedFile && (
            <Typography variant="body2"  color="white" sx={{ mt: 2 }}>
              Selected File: {selectedFile.name}
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