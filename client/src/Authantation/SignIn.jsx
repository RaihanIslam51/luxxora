import { useContext, useRef } from "react";
// import { Helmet } from "react-helmet";
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
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful");
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* <Helmet>
        <title>Login | Luxxora</title>
        <meta name="description" content="Sign in to your Luxxora account" />
      </Helmet> */}

      {/* Left Side - Visible only on medium+ screens */}
      <div className="hidden md:flex md:w-1/2 pt-20 relative bg-green-100">
        <img
          src="/MEN.png"
          alt="Ecommerce banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex flex-col justify-end p-6 md:p-10 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Welcome to Luxxora
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-200 max-w-sm">
            Premium products, handpicked for you. Sign in to shop smarter.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-tr from-green-50 via-emerald-100 to-lime-100 p-4 sm:p-6">
        <div className="bg-white/90 shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-green-100">
          <div className="text-center mb-6">
            <img
              src="/Luxxora.png"
              alt="Luxxora Logo"
              className="w-14 sm:w-16 mx-auto mb-2"
            />
            <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-700">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-green-700">
              Sign in to continue your shopping journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold text-green-800">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 px-3 py-2 sm:px-4 sm:py-2 border border-green-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-green-50/60 placeholder-green-400 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 sm:px-4 sm:py-2 border border-green-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-green-50/60 placeholder-green-400 text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-lime-400 to-green-400 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-2 rounded-xl shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center justify-center gap-2 text-sm text-green-600">
            <span className="w-1/4 h-px bg-green-200"></span>
            OR
            <span className="w-1/4 h-px bg-green-200"></span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 border border-green-200 rounded-xl py-2 bg-green-50 hover:bg-green-100 transition text-sm sm:text-base"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="font-semibold text-green-700">
              Continue with Google
            </span>
          </button>

          <p className="text-xs sm:text-sm text-center mt-6 text-green-700">
            New user?{" "}
            <Link
              to="/auth/register"
              className="text-emerald-600 underline hover:underline font-bold"
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
