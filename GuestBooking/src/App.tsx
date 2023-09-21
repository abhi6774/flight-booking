import { Box, Button, CircularProgress, Container, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import './App.css';
import { useBase } from './main';



function App() {
  const BASE_URL = useBase();
  const navigate = useNavigate();

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState<Date | string>(new Date());
  // const [travellers, setTravellers] = useState(1);


  const [requested, setRequested] = useState(false)
  const [loading, setLoading] = useState(false);


  async function search() {
    setRequested(true);
    setLoading(true);
    const response = await (await fetch(`${BASE_URL}/flight-offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: date,
        adults: 1
      })
    })).json();
    console.log((response as Array<any>).slice(0, 10));
    navigate("/offerings", {
      state: (response as Array<any>).slice(0, 10)
    })
    setLoading(false);
  }



  return (
    <Stack sx={{ "background": "white", height: "100vh", width: "100%" }}>
      <h1>Flight Search</h1>
      <Container  sx={{ display: "flex", gap: "10px", marginTop: "2rem", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <TextField id="outlined-basic" label="From" value={from} variant="outlined" onChange={(e) => {
          setFrom(e.target.value)
        }} />
        <TextField id="outlined-basic" label="To" value={to} variant="outlined" onChange={(e) => {
          setTo(e.target.value)
        }} />
        <label>
          <Stack>
            <span style={{ position: "absolute", top: "-20px"}}>Departure Time:</span>
            <TextField id="outlined-basic" sx={{ }} variant="outlined" type='date' onChange={(e) => setDate(e.target.value)} />
          </Stack>
        </label>
        {/* <TextField id="outlined" label="No. of travellers" variant="outlined" type='number' onChange={(e) => setTravellers(parseInt(e.target.value))} /> */}
        <Button variant="contained" onClick={search}>Search</Button>
      </Container>

      <Outlet />
      <Box sx={{ display: (loading && requested)? "flex": "none", justifyContent: "center", marginTop: "1.5rem" }}>
        <CircularProgress />
      </Box>
    </Stack>
  );
}

export default App;
