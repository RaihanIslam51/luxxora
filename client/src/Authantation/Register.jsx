import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import useAxiosSecure from '../Hook/useAxiosSecure';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { createUser, setUserData, updateUser, GoogleLogin } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo?.value || '';
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage('');

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photo });
      setUserData({ ...user, displayName: name, photoURL: photo });

      const userInfo = {
        name,
        photo,
        email,
        role: 'user',
        created_at: new Date().toISOString(),
      };

      await axiosSecure.post('/users', userInfo);
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed');
      toast.error(error.message || 'Registration failed.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await GoogleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName || 'No Name',
        photo: user.photoURL || '',
        email: user.email,
        role: 'user',
        created_at: new Date().toISOString(),
      };

      await axiosSecure.post('/users', userInfo);
      setUserData(user);

      toast.success('Signed in with Google!');
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || 'Google sign-in failed.');
      toast.error(error.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="min-h-screen flex pt-10 flex-col lg:flex-row bg-gradient-to-tr from-green-100 via-emerald-200 to-green-400">
      <Helmet>
        <title>Register - Luxxora</title>
      </Helmet>

      {/* Left Banner */}
      <div className="lg:w-1/2 relative flex items-center justify-center p-6 lg:p-0">
        <img
          src="/MEN.png"
          alt="Ecommerce banner"
          className="w-full h-64 lg:h-screen object-cover rounded-3xl lg:rounded-none shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center lg:rounded-none rounded-3xl">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg px-4">
            Welcome to Luxxora
          </h1>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl p-8 md:p-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-200 box-border"
        >
          {/* Logo */}
          <img
            src="/Luxxora.png"
            alt="Luxxora Logo"
            className="w-20 mx-auto mb-4 drop-shadow-md"
          />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-600 to-emerald-500 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Raihan Islam"
                className="w-full px-5 py-3 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-green-300 text-gray-900 shadow-md transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-900 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-green-300 text-gray-900 shadow-md transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={passwordShow ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  className="w-full px-5 py-3 rounded-2xl bg-white/80 focus:bg-white focus:ring-4 focus:ring-green-300 text-gray-900 shadow-md transition"
                />
                <span
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 text-sm font-semibold cursor-pointer"
                >
                  {passwordShow ? 'Hide' : 'Show'}
                </span>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-700 via-lime-600 to-emerald-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent" />
            <span className="text-green-700 text-sm font-semibold">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-green-400 to-transparent" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-green-100 py-3 rounded-2xl shadow-md hover:bg-green-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="font-semibold text-green-800">
              Sign up with Google
            </span>
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-base">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-green-700 underline font-bold hover:text-emerald-600 transition"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
