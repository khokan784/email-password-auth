import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "./firebase.init";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        console.log(email, password,terms,name,photo);

        if(!terms){
            setErrorMessage('Please accepted terms of conditions')
            return;
        }
        
        if (password.length < 6) {
            setErrorMessage(' password should be 6 character or longer')
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&*]{6,}$/

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one number and one special character')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setErrorMessage('');
                setSuccess(true);
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('email verification send')
                })
                const profile = {
                    displayName : name,
                    photoURL : photo
                }
                updateProfile(auth.currentUser,profile)
                .then(()=>{
                    console.log('profile updated')
                })
                .catch(error=>{
                    console.log('user profile updated error')
                })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message);
                setSuccess(false);
            })
    }




    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-8">
            <h1 className="text-4xl font-bold text-center mt-4">Sign up now!</h1>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" placeholder="photo url" name="photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className="text-lg absolute right-4 top-14">{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                        <input type="checkbox" name="terms" className="checkbox" />
                        <span className="label-text">accepted out term of condition</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            {
                errorMessage && <p className="text-red-600 text-center mb-6">{errorMessage}</p>
            }
            {
                success && <p className="text-green-600 text-center mb-6"> sign up is successful</p>
            }
             <p className="text-center p-4">Already have an account please <Link to='/login'>Log in</Link></p>
        </div>
    );
};

export default SignUp;