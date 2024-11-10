import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [loginError,setLoginError] = useState('')
    const emailRef = useRef()

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        setSuccess(false)
        setLoginError('')


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)              
                if(!result.user.emailVerified){
                    setLoginError('Please verify your email address')
                }
                else{
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log('ERROR', error.message)
                setLoginError(error.message)
            })
    }

    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('please provide a valid email address')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=> {
                console.log('reset email sent, please check your email')
            })
        }
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h3 className="text-3xl text-center">Login</h3>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPassword} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            success && <p className="text-green-600 text-center mb-6"> user login successful</p>
                        }
                        {
                            loginError && <p className="text-red-600 text-center">{loginError}</p>
                        }
                        <p className="text-center p-4">New to this website please <Link to='/signup'>Sign up</Link></p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;