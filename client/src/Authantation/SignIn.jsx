import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const SignIn = () => {
  const emailRef = useRef();
  const { SignInUser, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignInUser(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(location?.state?.from || "/");
      })
      .catch(() => {
        toast.error("Invalid email or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    GoogleLogin()
      .then((result) => {
        toast.success("Login successful");
        navigate(location?.state?.from || "/");
      })
      .catch(() => {
        toast.error("Google login failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        <div className="absolute inset-0 z-2 flex flex-col justify-center items-start p-16 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <img
                src="/Luxxora.png"
                alt="Luxxora Logo"
                className="w-12 h-12 mr-3"
              />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Elevate Your Shopping Experience
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Discover premium products curated exclusively for our discerning
              customers. Sign in to access your personalized shopping journey.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <div className="w-8 h-px bg-gray-400"></div>
              <span>Premium since 2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
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

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to continue your shopping journey
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
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
                <div className="mt-2 text-right">
                  <a
                    href="#"
                    className="text-sm font-medium text-black hover:text-gray-700"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

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
                    Signing in...
                  </>
                ) : (
                  "Sign in"
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

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                New to Luxxora?{" "}
                <Link
                  to="/auth/register"
                  className="font-medium text-black hover:text-gray-700 underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to Luxxora's{" "}
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

export default SignIn;