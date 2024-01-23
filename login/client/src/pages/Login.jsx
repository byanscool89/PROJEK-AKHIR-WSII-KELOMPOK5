import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
    
      const navigate = useNavigate();
    
      useEffect(() => {
        if (localStorage.getItem("user-info")) {
          navigate("/home");
        }
      })
    
      const handleChange = (e) => {
        setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = async () => {
        const res = await axios.post("http://localhost:8080/api/login", inputs);
        localStorage.setItem("user-info", JSON.stringify(res));
        navigate("/home");
    }
    
  return (
    <body className='bg-white'>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
            <div className="pl-4 flex items-center mb-10 invalid:border-indigo-900 flex items-center justify-center ">
           
                <div className="font-bold text-6xl lg:text-3xl text-gray-800">WELCOME TO TOKO <span className='text-indigo-900'> SEPATU</span></div>
            </div>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="username"
                            placeholder='Username'
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='username'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
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
                    <div className="mt-6">
                        <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white uppercase rounded bg-indigo-900 hover:bg-indigo-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Login
                        </button>
                    </div>
                  
                    <div>
                        
                    </div>
                    <div>
                        <div className="flex items-center justify-center space-x-4 mt-3">
                       
                  
                        </div>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Don't have an account?
                    <Link to={"/Register"}>
                        <div className="font-medium text-indigo-500 hover:underline">Register</div>
                    </Link>
                </p>
                
            </div>
        </div>
    </body>

    
            
  )
}
export default Login;
