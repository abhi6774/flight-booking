import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function getAccessToken() {
  const API_KEY = process.env.API_KEY;
  const API_SECRET = process.env.API_SECRET;
  const accessToken = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  process.env["ACCESS_TOKEN"] = accessToken.data.access_token;
}

async function flightOffers() {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const offers = await axios.post(
    "https://test.api.amadeus.com/v2/shopping/flight-offers",
    {
      currencyCode: "USD",
      originDestinations: [
        {
          id: "1",
          originLocationCode: "NYC",
          destinationLocationCode: "DEL",
          departureDateTimeRange: {
            date: "2023-11-01",
            time: "10:00:00",
          },
        },
      ],
      travelers: [
        {
          id: "1",
          travelerType: "ADULT",
        },
      ],
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 2,
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: "BUSINESS",
              coverage: "MOST_SEGMENTS",
              originDestinationIds: ["1"],
            },
          ],
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  const data = {
    data: {
      type: "flight-order",
      flightOffers: [],
      travelers: [
        {
          id: "1",
          dateOfBirth: "1982-01-16",
          name: {
            firstName: "JORGE",
            lastName: "GONZALES",
          },
          gender: "MALE",
          contact: {
            emailAddress: "jorge.gonzales833@telefonica.es",
            phones: [
              {
                deviceType: "MOBILE",
                countryCallingCode: "34",
                number: "480080076",
              },
            ],
          },
          documents: [
            {
              documentType: "PASSPORT",
              birthPlace: "Madrid",
              issuanceLocation: "Madrid",
              issuanceDate: "2015-04-14",
              number: "00000000",
              expiryDate: "2025-04-14",
              issuanceCountry: "ES",
              validityCountry: "ES",
              nationality: "ES",
              holder: true,
            },
          ],
        },
      ],
      remarks: {
        general: [
          {
            subType: "GENERAL_MISCELLANEOUS",
            text: "ONLINE BOOKING FROM INCREIBLE VIAJES",
          },
        ],
      },
      ticketingAgreement: {
        option: "DELAY_TO_CANCEL",
        delay: "6D",
      },
      contacts: [
        {
          addresseeName: {
            firstName: "PABLO",
            lastName: "RODRIGUEZ",
          },
          companyName: "INCREIBLE VIAJES",
          purpose: "STANDARD",
          phones: [
            {
              deviceType: "LANDLINE",
              countryCallingCode: "34",
              number: "480080071",
            },
            {
              deviceType: "MOBILE",
              countryCallingCode: "33",
              number: "480080072",
            },
          ],
          emailAddress: "support@increibleviajes.es",
          address: {
            lines: ["Calle Prado, 16"],
            postalCode: "28014",
            cityName: "Madrid",
            countryCode: "ES",
          },
        },
      ],
    },
  };

  console.log(offers.data);
  data.data.flightOffers.push(offers.data.data[0]);
  console.log(JSON.stringify(data));
  return data;
}

async function BookFlight() {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const data = await flightOffers();
  const result = await axios.post(
    "https://test.api.amadeus.com/v1/booking/flight-orders",
    data,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  console.log(result);
}

async function main() {
  await getAccessToken();

  await BookFlight();
}

main();
