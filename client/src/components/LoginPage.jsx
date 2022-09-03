import React, {useEffect, useState} from "react";
import {LoginBg} from "../assets/video";
import {FcGoogle} from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../config/firebase.config";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser, checkIsAuth, loginUser} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'
import {validateUser} from "../api";
import {actionType} from "../Context/reducer";
import {useStateValue} from "../Context/StateProvider";
import Login from "./Login";

const LoginPage = ({setAuth}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {status} = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{user}, dispatch] = useStateValue();
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            window.localStorage.setItem("auth", "true");
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                });
                            });
                        });
                        navigate("/", {replace: true});
                    } else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        });
                        navigate("/login");
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (window.localStorage.getItem("auth") === "true")
            navigate("/", {replace: true});
    }, []);
    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({username, password}))
        } catch (error) {
            console.log(error)
        }
    }
    return (<div className="relative w-screen h-screen">
            <video
                src={LoginBg}
                type="video/mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
            ></video>
            <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">

                <div
                    className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
                    {/*<form*/}
                    {/*    onSubmit={(e) => e.preventDefault()}*/}
                    {/*    className='w-2/4 h-52 mx-auto mt-15'*/}
                    {/*>*/}
                    {/*    <h1 className='text-lg text-white text-center'>Авторизация</h1>*/}
                    {/*    <label className='text-xs text-gray-400'>*/}
                    {/*        Имя:*/}
                    {/*        <input*/}
                    {/*            type='text'*/}
                    {/*            value={username}*/}
                    {/*            onChange={(e) => setUsername(e.target.value)}*/}
                    {/*            placeholder='Username'*/}
                    {/*            className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'*/}
                    {/*        />*/}
                    {/*    </label>*/}

                    {/*    <label className='text-xs text-gray-400'>*/}
                    {/*        Пароль:*/}
                    {/*        <input*/}
                    {/*            type='password'*/}
                    {/*            value={password}*/}
                    {/*            onChange={(e) => setPassword(e.target.value)}*/}
                    {/*            placeholder='Password'*/}
                    {/*            className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'*/}
                    {/*        />*/}
                    {/*    </label>*/}

                    {/*    <div className='flex gap-8 justify-center mt-4'>*/}
                    {/*        <button*/}
                    {/*            type='submit'*/}
                    {/*            onClick={handleSubmit}*/}
                    {/*            className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'*/}
                    {/*        >*/}
                    {/*            Войти*/}
                    {/*        </button>*/}
                    {/*        <Link*/}
                    {/*            to='/register'*/}
                    {/*            className='flex justify-center items-center text-xs text-white'*/}
                    {/*        >*/}
                    {/*            Нет аккаунта ?*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}

                    {/*</form>*/}
                    <div
                        onClick={loginWithGoogle}
                        className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
                    >
                        <FcGoogle className="text-xl" />
                        <p>Войти при помощи Google</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;
