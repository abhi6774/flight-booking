import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FlightOffer } from "./utils";


export default function ShowResponse() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flightOffers = state as (FlightOffer & any)[];

  console.log(state);

  if (!state) {
    navigate("/");
  }

  return (
    <Stack>
      <Typography variant="h6">Showing Results</Typography>
      {
        flightOffers.map((flightOffer) =>
        (
          <Card key={flightOffer.id} sx={{ width: "100%", height: "200px", position: "relative", marginBottom: "1.5rem" }}>
            <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
              <Typography sx={{
                width: "40px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>{flightOffer.id}</Typography>
              <Stack>

                <Container><Typography variant="caption">Last Ticket Date: {flightOffer.lastTicketingDate} </Typography></Container>
                <Container><Typography variant="caption">Seats Available: {flightOffer.numberOfBookableSeats} </Typography></Container>
                <Container><Typography variant="caption">Base price: {flightOffer.price.currency} {flightOffer.price.base } </Typography></Container>
                <Container><Typography variant="caption">Total price: {flightOffer.price.currency} {flightOffer.price.grandTotal } </Typography></Container>
                <Button sx={{ position: "absolute", right: "20px", bottom: "20px" }} variant="outlined" onClick={() => navigate(`/bookingflight/${flightOffer.id}`, {
                  state: {
                    flightOffer,

                  }
                })}>Book Now</Button>
              </Stack>
            </Box>
          </Card>
        ))
      }
    </Stack>
  )
}
