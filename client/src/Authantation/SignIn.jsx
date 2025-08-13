import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "./Context/AuthContext";

const SignIn = () => {
  const emailRef = useRef();
  const { SignInUser, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignInUser(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(location?.state?.from || "/");
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then((result) => {
        toast.success("Login successful");
        navigate(location?.state?.from || "/");
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-100 via-white to-gray-100">
      {/* Left side with image & branding (hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="/MEN.png"
          alt="Ecommerce banner"
          className="w-full h-full object-cover rounded-r-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex flex-col justify-end p-12 rounded-r-3xl">
          <h1 className="text-white text-4xl font-extrabold mb-3">Welcome to Luxxora</h1>
          <p className="text-gray-300 max-w-xs leading-relaxed">
            Premium products, handpicked for you. Sign in to shop smarter and elevate your style.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
        <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-8 sm:p-12">
          <div className="text-center mb-10">
            <img
              src="/Luxxora.png"
              alt="Luxxora Logo"
              className="mx-auto w-16 sm:w-20 mb-4"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Sign in to continue your shopping journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-semibold">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 bg-white hover:bg-gray-50 transition text-gray-800 font-semibold"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-6 h-6"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-gray-600 text-sm">
            New user?{" "}
            <Link
              to="/auth/register"
              className="text-black underline font-semibold hover:text-gray-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
