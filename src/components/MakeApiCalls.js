import React from 'react';
import { useGetCryptoNewsQuery } from './ApiFetch';


const GetNews = () => {

    const newsCategory = ['Bitcoin', 'Solana']
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 20 })

    console.log(cryptoNews?.value)

    return(
        <div>
            {console.log(cryptoNews?.value)}
        </div>
    )
}

export default GetNews