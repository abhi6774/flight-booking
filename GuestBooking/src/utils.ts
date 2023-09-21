export type FlightOffer = {
    id: string,
    price: {
        currency: string,
        total: string,
        base: string,
        fees: [
            {
                amount: string,
                type: string
            },
            {
                amount: string,
                type: string
            }
        ],
        grandTotal: string,
        additionalServices: [
            {
                amount: string,
                type: string
            }
        ]
    }
};

export interface Traveler {
    id: string;
    dateOfBirth: string;
    name: {
        firstName: string;
        lastName: string;
    };
    gender: string;
    contact: {
        emailAddress: string;
        phones: {
            deviceType: string;
            countryCallingCode: string;
            number: string;
        }[];
    };
    documents: Documents[]
}


export interface Documents {
    documentType: string;
    birthPlace: string;
    issuanceLocation: string;
    issuanceDate: string;
    number: string;
    expiryDate: string;
    issuanceCountry: string;
    validityCountry: string;
    nationality: string;
    holder: boolean;
}
