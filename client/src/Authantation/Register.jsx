import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { AuthContext } from './Context/AuthContext';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { createUser, setUserData, updateUser, GoogleLogin } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo?.value.trim() || '';
    const email = form.email.value.trim();
    const password = form.password.value;

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side with image & branding (hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img
          src="/MEN.png"
          alt="Ecommerce banner"
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-16 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <img
                src="/Luxxora.png"
                alt="Luxxora Logo"
                className="w-12 h-12 mr-3"
              />
              <h1 className="text-3xl font-bold">Luxxora</h1>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Join Our Exclusive Community
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Create an account to access premium products, personalized recommendations, and exclusive member benefits.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <div className="w-8 h-px bg-gray-400"></div>
              <span>Premium since 2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 lg:hidden">
            <div className="flex justify-center items-center mb-6">
              <img
                src="/Luxxora.png"
                alt="Luxxora Logo"
                className="w-16 h-16 mr-3"
              />
              <h1 className="text-3xl font-bold text-gray-900">Luxxora</h1>
            </div>
            <p className="text-gray-600">
              Premium products, handpicked for you
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join Luxxora for an exclusive shopping experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="photo"
                    name="photo"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                    autoComplete="photo"
                  />
                </div>
              </div> */}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={passwordShow ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={passwordShow ? 'Hide password' : 'Show password'}
                  >
                    {passwordShow ? (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-red-50 p-3">
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 bg-white hover:bg-gray-50 transition text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-black hover:text-gray-700 underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to Luxxora's{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and acknowledge you've read our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;