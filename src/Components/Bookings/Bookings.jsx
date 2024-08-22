import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../Api Helper/apiHelp';
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material';

const Bookings = () => {
    const [movie,setMovie]=useState();
    const [inputs,setInputs] = useState({seatno:"",date:""})
    const id = useParams().id;
    console.log(id);
    useEffect(()=>{
      getMovieDetails(id).then((res)=>setMovie(res.Movie)).catch((err)=>console.log(err));
    },[id])
    console.log(movie);
    const handleChange=(e)=>{
      setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
       e.preventDefault();
       console.log(inputs);
       newBooking({...inputs,movie:movie._id})
       .then((res)=>console.log(res))
       .catch((err)=>console.log(err));
    }

  return (
    <div>{movie&& (<Fragment>
      <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>
        Book Tickets of {movie.title}
        </Typography>
        <Box display={'flex'} justifyContent={'center'}>
          <Box display={'flex'} justifyContent={'column'} flexDirection={'column'} paddingTop={3} width={"50%"} marginRight={'auto'}>
            <Box width={'80%'} marginTop={3} padding={2}>
              <img width='80%' height={'300px'} src={movie.posterUrl} alt={movie.title} />
              <Typography paddingTop={2}>{movie.description}</Typography>
              <Typography fontWeight={'bold'} marginTop={1}>
                Starrer:
                {movie.actors.map((actor)=>" "+actor+ ",")}
              </Typography>
              <Typography fontWeight={'bold'} marginTop={1}>
                Release Date: {new Date (movie.releaseDate).toDateString()}
              </Typography>
            </Box>
            </Box>
            <Box>
              <Box width={'100%'} paddingTop={3}>
                <form onSubmit={handleSubmit}>
                  <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
                    <FormLabel>Seat Number</FormLabel>
                    <TextField value={inputs.seatno} onChange={handleChange} name='seatno' type='number' margin='normal' variant='standard'/>
                    <FormLabel>Booking Date</FormLabel>
                    <TextField value={inputs.date} onChange={handleChange} name='date' type='date' margin='normal' variant='standard'/>
                    <Button type='submit' sx={{mt:3}}>Book Now</Button>
                  </Box>
                </form>
              </Box>
            </Box>
            </Box></Fragment>)}</div> 
  )
}

export default Bookings