import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import apiClient from '../services/apiClient';

const Login = () => {
  const [state, setState] = useState('Admin'); // Toggle between Admin and Doctor
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // backendUrl is now handled by apiClient

  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await apiClient.post(endpoint, { email, password });

      if (data.success) {
        if (state === 'Admin') {
          setAToken(true); // Just set a flag or fetch admin info if needed
          toast.success('Admin login successful');
        } else {
          setDToken(true); // Just set a flag or fetch doctor info if needed
          toast.success('Doctor login successful');
        }
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span> Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="email"
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base'>
          Login
        </button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
