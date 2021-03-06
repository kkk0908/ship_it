import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNIN_VENDOR } from "../../../graphql/mutations";
import loadingStore from "../../../store/loading";
import vendorStore from "../../../store/vendor";

/**
 * TODO:-
 * Initialise the appstore in Appstore
 * UseContext Hook is Context api - Passes data in hierarchy
 * 
 */

export default function LoginCard(){
    const [user, setUser] = useState({
        email: "care@delhivery.com",
        password: "#Test2021#"
    });
    const [err, setErr] = useState("");
    const [login, { data, loading, error }] = useMutation(SIGNIN_VENDOR);
    const navigate = useNavigate();
    const dashboardPath = '/vendor_dashboard';

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setUser({ ...user, email: value });
                break;
            case 'password':
                setUser({ ...user, password: value });
                break;
            default:
                break;
        }
    }; 

    

    const handleSubmit = () =>{
        loadingStore.setLoading({loading: true});
        const loginInput = {
            user_email:user.email,
            password:user.password
        };
        login({
            variables: { 
                loginInput: loginInput
            }
        }).then(res=>{
            const vendorDetails = {
                user_email: res.data.login.user_email,
                auth_token: res.data.login.auth_token,
                id: res.data.login.id,
                vendor_id: res.data.login.vendor_id
            };
            // localStorage.setItem('token', res.data.login.auth_token);
            vendorStore.setVendorDetails(vendorDetails);
            loadingStore.setLoading({loading: false});
            navigate(dashboardPath);
        }).catch(err=>{
            loadingStore.setLoading({loading: false});
            setErr(err.message);
        });
    };

    return(
        <div className="rounded-lg shadow-lg bg-white max-w-sm p-12">
            <h1 className="text-xl tracking-tight text-center mb-8 font-medium text-gray-900 sm:text-5xl md:text-4xl">Login Now</h1>
            {err?.length>0&&<p className="text-sm text-red-500 ">{err}</p>}
            <form noValidate>
                <input type="email" onBlur={handleChange} defaultValue="care@delhivery.com" name="email" className="font-medium mx-auto mt-4 form-control block w-full px-4 py-3 text-base placeholder:font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Your email" />
                <input type="password" onBlur={handleChange} defaultValue="#Test2021#" name="password" className="font-medium mx-auto my-6 form-control block w-full px-4 py-3 text-base placeholder:font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Your password" />
                <label className="block text-left mb-2 ml-2">
                    <input type="checkbox" className="w-4 h-4 border-red-200 align-middle"/>
                    <span className="text-gray-400 ml-2 font-light text-sm" >I agree to the Terms of service</span>
                </label>
                <button type="button" onClick={handleSubmit} className="btn btn-primary bg-red-500 text-white font-medium w-full rounded-3xl py-3 my-4">SIGN IN</button>
                <div className="flex my-2">
                    <div className="h-0.5 bg-gray-200 flex-1 place-self-center	" />
                    <p className="text-sm text-gray-200 mx-2">or</p>
                    <div className="h-0.5 bg-gray-200 flex-1 place-self-center	" />
                </div>
                <Link to="/vendor_signup">
                    <button type="button" className="btn btn-primary bg-gray-800 font-medium text-white w-full rounded-3xl py-3 my-2">SIGN UP</button>
                </Link>
            </form>
            <p className="mt-2"><span className="text-gray-400 font-medium">Forgot your password?</span><button type="button" className="text-green-500 font-medium ml-2">Click here</button></p>
        </div>
    );
}