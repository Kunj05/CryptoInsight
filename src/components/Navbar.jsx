
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { setCurrency } from '../redux/currencySlice';
import { selectuser, setlogoutuser } from '../redux/userSlice';
import { auth } from '../firebase';
import {toast} from 'react-hot-toast'

const Navbar = ( {openmodal} ) => {
    const options = [
        { value: 'usd', label: 'USD' },
        { value: 'inr', label: 'INR' }
    ];
    
    const dispatch = useDispatch();
    const user = useSelector(selectuser)
    console.log('user',user);
    const handleCurrencyChange = (e) => {
        dispatch(setCurrency(e.value));
    }
    const handlelogout = ()=>{
        try{
            auth.signOut()
            toast.success("Successfully logout");
            dispatch(setlogoutuser())
        }
        catch(error){
            toast.error(error);
        }
    }
    return (
        <ul className='flex gap-[15vw] sm:gap-[35vw] md:gap-[50vw] justify-evenly    bg-[#14161a] p-2 top-0 items-center w-full sticky nav z-[1]'>
            <Link className='font-bold text-[#87CEEB] text-2xl' to="/">CryptoInsight</Link>
            <div className='flex text-white gap-[1vw]'>
                <Select
                    options={options}
                    defaultValue={options[1]}
                    onChange={handleCurrencyChange}
                    className='text-black font-bold'
                />
                {
                    user && user.accessToken  ? 
                    <button onClick={handlelogout}>Logout</button>
                    :
                    <button onClick={openmodal}>Login</button>
                }
            </div>
        </ul>
    )
}


export default Navbar;