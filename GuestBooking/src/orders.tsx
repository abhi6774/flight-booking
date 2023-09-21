import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBase } from "./main";

export function Orders() {
    const [orders, setOrders] = useState<any>()
    const navigate = useNavigate();
    const BASE_URL = useBase();

    if (orders.length === 0) {
        navigate("/");
    }

    useEffect(() => {
        fetch(`${BASE_URL}/orders`).then(async (response) => {
            // console.log(await response.json())
            setOrders(await response.json())
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <Stack>
            {JSON.stringify(orders)}
        </Stack>
    )
}
