import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectuser, setactiveuser } from '../../redux/userSlice';
import { fetchWatchlist } from '../../redux/watchlistSlice';
import { LuEyeOff, LuEye } from "react-icons/lu";
import toast from 'react-hot-toast';

const Login = ({ closemodal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');

    const dispatch = useDispatch();
    const user = useSelector(selectuser);

    const handleToggle = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchWatchlist(user.accessToken));
        }
    }, [dispatch, user]);

    const handlesubmit = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            dispatch(setactiveuser({
                accessToken: result.user.accessToken,
                email: result.user.email
            }));
            toast.success("Login Successful! Now you can use the wishlist feature.");
            closemodal(); // Close modal on successful login
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlegooglesignin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            dispatch(setactiveuser({
                accessToken: result.user.accessToken,
                email: result.user.email
            }));
            toast.success('Google sign-in successful');
            closemodal(); // Close modal on successful Google sign-in
        } catch (error) {
            toast.error('Google sign-in error: ' + error.message);
        }
    };

    return (
        <div className='flex flex-col gap-[10px] items-center w-full'>
            <input type="text" placeholder='  Enter Email' className='w-full text-black' onChange={(e) => setEmail(e.target.value)} />

            <div className='w-full' style={{ position: "relative" }}>
                <div className='w-full '>
                    <input
                        placeholder='Enter password '
                        type={type}
                        name="password"
                        value={password}
                        className='w-full text-black'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ position: "absolute", right: 9, top: 12, filter: "invert(100%)" }} onClick={handleToggle}>
                    {type === "password" ? <LuEyeOff /> : <LuEye />}
                </div>
            </div>

            <button className='w-full' style={{ backgroundColor: "rgb(66, 133, 244)", color: "white" }} onClick={handlesubmit}>Submit</button>
            <p>OR</p>

            <div onClick={handlegooglesignin}
                type="dark"
                tabIndex="0"
                role="button"
                style={{
                    backgroundColor: 'rgb(66, 133, 244)',
                    color: 'rgb(255, 255, 255)',
                    height: '50px',
                    width: '100%',
                    border: 'none',
                    textAlign: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
                    fontSize: '16px',
                    lineHeight: '48px',
                    display: 'block',
                    borderRadius: '1px',
                    transition: 'background-color 0.218s ease 0s, border-color 0.218s ease 0s, box-shadow 0.218s ease 0s',
                    fontFamily: 'Roboto, arial, sans-serif',
                    cursor: 'pointer',
                    userSelect: 'none',
                    outline: 'none'
                }}
            >
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        textAlign: 'center',
                        display: 'block',
                        marginTop: '1px',
                        marginLeft: '1px',
                        float: 'left',
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderRadius: '1px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="46px"
                        height="46px"
                        viewBox="0 0 46 46"
                        style={{
                            width: '48px',
                            height: '48px',
                            display: 'block'
                        }}
                    >
                        {/* SVG Content */}
                    </svg>
                </div>
                <span className='text-sm sm:text-base'>Sign in with Google</span>
            </div>
        </div>
    );
};

export default Login;
