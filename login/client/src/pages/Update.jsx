import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const initialState = {
    username: "",
    email: "",
    tanggal_lahir: "",
    password: "",
};

const Update = () => {
    const[state, setState] = useState(initialState);
    const { username, email, tanggal_lahir, password } = state;
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/get/${id}`).then((response) => {
            setState({ ...response.data[0] });
        });
    }, []);

    const handleChange = (e) => {
        setState((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/update/${id}`, {
            username,
            email,
            tanggal_lahir,
            password,
        });
        setTimeout(() => {
            alert("Data berhasil diupdate")
            navigate("/user");
        }, 1000)
    };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black">
                Update
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            required
                            type="text"
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name="username"
                            onChange={handleChange}    
                            value={username || ""}                    
                            />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            required
                            type="email"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='email'
                            onChange={handleChange}
                            value={email || ""}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="date"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            required
                            type="date"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name="tanggal_lahir"
                            onChange={handleChange}
                            value={tanggal_lahir || ""}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            required
                            type="password"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            name='password'
                            onChange={handleChange}
                            value={password || ""}
                        />
                        </div>
                        <div className="mt-6">
                            <button type='submit' onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-700">
                        Update
                            </button>
                        </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Tidak jadi update data?{" "}
                    <Link to={"/user"}>
                    <p className="font-medium text-indigo-500 hover:underline">
                        Back
                    </p>
                    </Link>
                    
                </p>
            </div>
        </div>
  )
}
export default Update;