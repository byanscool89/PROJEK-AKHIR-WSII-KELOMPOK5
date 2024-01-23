import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    const [inputs, setInputs] = useState({
      username:"",
      email: "",
      tanggal_lahir: "",
      password: "",
      confirmPassword: "",
    });
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputs.password !== inputs.confirmPassword) {
        setError('The password and confirm password fields do not match');
        return;
      }
      setError('');
      axios.post("http://localhost:8080/api/register", inputs);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };
    
    return (
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-white">
            <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
                <div className="pl-4 flex items-center mb-10 invalid:border-indigo-900 flex items-center justify-center ">
                 
                    <div className="font-bold text-5xl lg:text-4x2 text-black">KUTSU <span className='text-indigo-900'>SEPATU</span></div>
                </div>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="text"
                            placeholder='Username'
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="email"
                            placeholder='Email Addres'
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="date"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="date"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='tanggal_lahir'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="password"
                            placeholder='Password'
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='password'
                            onChange={handleChange}
                        />
                        </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            onChange={handleChange}
                        />
                        {error && <div className="text-red-500 text-xs">{error}</div>}

                    </div>
                    <div className="mt-6">
                        <button type="submit" onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white uppercase rounded bg-indigo-900 hover:bg-indigo-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Register
                        </button>
                    </div>
                </form>
                 
                    </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <Link to={"/"}>
                    <p className="font-medium text-indigo-500 hover:underline">
                        Login
                    </p>
                    </Link>
                    
                </p>
            </div>
       
  )
}
export default Register;
