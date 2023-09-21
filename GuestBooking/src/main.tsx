import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
// import { BookFlight } from './BookFlight.tsx';


import { BookFlight } from './BookFlight.tsx'
import ShowResponse from './ShowResponse.tsx'
import './index.css'
import { Orders } from './orders.tsx'

const BASE_URL = createContext("http://localhost:3001/api");

export function useBase() {
  return React.useContext(BASE_URL);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BASE_URL.Provider value="http://localhost:3001/api">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/offerings" element={<ShowResponse />} />
          </Route>
          <Route path='/bookingflight/:id' element={<BookFlight />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </BASE_URL.Provider>
  </React.StrictMode>,
)
