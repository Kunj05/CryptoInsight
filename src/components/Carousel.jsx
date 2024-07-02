import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { TrendingCoins } from '../Api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Carousel = () => {
    const currency = useSelector((store) => store.currency.currency);
    const [arr, setArr] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(TrendingCoins(currency));
                setArr(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('Error', error.message);
            }
        };
        fetchdata();
    }, [currency]);

    const clicked = (id) => {
        navigate(`/coins/${id}`);
    };

    const getclass = (priceChange) => {
        const numericVal = Number(priceChange);
        return numericVal < 0 ? "text-red-600 text-xs" : "text-green-600 text-xs";
    };

    return (
        <div className='Carouselimg flex-col items-center justify-center'>
            <h1 className='text-center text-5xl sm:text-5xl p-4 font-bold text-[#87CEEB]'>CryptoInsight
            </h1>
            <p className='text-center text-sm text-[#87CEEB]'>Get All The Info Regarding Your Favorite Crypto Currency</p>
            <AliceCarousel
                autoPlay
                infinite
                autoPlayInterval={1800}
                disableButtonsControls
                disableDotsControls
                responsive={{ 0: { items: 2 }, 476: { items: 3 }, 768: { items: 4 } }}
                mouseTracking
                items={arr.map((curr) => (
                    <div key={curr.id} className='flex flex-col justify-center items-center pt-1 sm:pt-6 text-white' onClick={() => clicked(curr.id)}>
                        <img className='h-[75px] bg-transparent cursor-pointer' src={curr.image} alt={curr.name} />
                        <p className='text-center pt-3'>{curr.name}</p>
                        <p className='p-1'>{currency === 'usd' ? `$ ${curr.current_price.toLocaleString()}` : `₹ ${curr.current_price.toLocaleString()}`}</p>
                        <span className={getclass(curr.price_change_percentage_24h_in_currency)}>{curr.price_change_percentage_24h_in_currency ? `${curr.price_change_percentage_24h_in_currency.toFixed(2)} %` : 'N/A'}</span>
                    </div>
                ))}
            />
        </div>
    );
};

export default Carousel;
