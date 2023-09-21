import { Card, Stack } from "@mui/material";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBase } from "./main";
import { Traveler } from "./utils";

export function BookFlight() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const BASE_URL = useBase();
    const { flightOffer } = state;



    const dateOfBirth = useRef<HTMLInputElement>(null);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const emailAddress = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLSelectElement>(null);



    async function onSubmitForm() {
        const traveler: Traveler = {
            documents: [{
                "documentType": "PASSPORT",
                "birthPlace": "Madrid",
                "issuanceLocation": "Madrid",
                "issuanceDate": "2015-04-14",
                "number": "00000000",
                "expiryDate": "2025-04-14",
                "issuanceCountry": "ES",
                "validityCountry": "ES",
                "nationality": "ES",
                "holder": true
            }],
            name: {
                firstName: firstName.current!.value,
                lastName: lastName.current!.value
            },
            contact: {
                emailAddress: emailAddress.current!.value,
                phones: [{
                    countryCallingCode: "91",
                    deviceType: "MOBILE",
                    number: "2947324783"
                }]
            },
            dateOfBirth: dateOfBirth.current!.value,
            gender: gender.current!.value,
            id: "1"
        }

        try {
            const response = await fetch(`${BASE_URL}/bookflight`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    traveler,
                    flightOffer
                })
            });
            const result = await response.json();
            console.log(result);
            navigate("/orders", {
                state:result
            });
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Stack>
            <h1>Book Flight - Enter Traveler Details</h1>
            <Card>
                <Stack sx={{alignItems: "flex-start", marginTop: "2rem", gap:"10px"}}>
                <label>Date of birth: <input ref={dateOfBirth} type="date" name="dateOfBirth"/></label>
                <label>First Name: <input ref={firstName} type="text" name="firstName"/></label>
                <label>Last Name: <input ref={lastName} type="text" name="lastName"/></label>
                <label>Gender: <select ref={gender}><option value="MALE">Male</option>
                    <option value="FEMALE">Female</option></select></label>
                <label>Email: <input type="email" name="email" ref={emailAddress} /></label>

                    <button onClick={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                    }}>Place Order</button>
                </Stack>
            </Card>
        </Stack>
    );
}
