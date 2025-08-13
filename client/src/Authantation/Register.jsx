import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
// import { Helmet } from 'react-helmet';
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
    setErrorMessage('');

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo?.value.trim() || '';
    const email = form.email.value.trim();
    const password = form.password.value;

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

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
    <div className="min-h-screen pt-10 flex flex-col justify-center items-center">
      {/* <Helmet>
        <title>Register - Luxxora</title>
      </Helmet> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-10"
        role="main"
        aria-label="Registration form"
      >
        <h2 className="text-3xl pt-10 sm:text-4xl font-extrabold text-center text-gray-900 mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Raihan Islam"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-700 mb-1">
              Photo URL (optional)
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              autoComplete="photo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShow ? 'text' : 'password'}
                required
                placeholder="Enter password"
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none"
                aria-label={passwordShow ? 'Hide password' : 'Show password'}
              >
                {passwordShow ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-2xl font-bold text-lg shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-600"
          >
            Register
          </button>



        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <span className="text-gray-700 text-sm font-semibold">OR</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-2xl shadow-md hover:bg-gray-50 transition focus:outline-none focus:ring-4 focus:ring-indigo-300"
          aria-label="Sign up with Google"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
            aria-hidden="true"
          />
          <span className="font-semibold text-gray-900">
            Sign up with Google
          </span>
        </button>

        {/* Login Link */}
        <p className="mt-8 text-center text-base text-gray-700">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-indigo-600 font-bold underline hover:text-indigo-800 transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
