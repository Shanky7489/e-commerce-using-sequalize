import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // For alerts

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make the logout API call
      await axios.get("http://localhost:4000/api/user/logout", null, {
        withCredentials: true, // Send cookies with the request
      });

      // Clear token from local storage
      localStorage.removeItem("authToken");

      // Show success message
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out!",
        icon: "success",
      }).then(() => {
        navigate("/login"); // Redirect to login page
      });
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.error ||
          "Something went wrong during logout. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 w-[90%] m-auto">
        {/* Company Logo */}
        <div className="text-xl font-bold">
          <Link to="/">E-Commerce</Link>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/product" className="hover:text-gray-400">
              Product
            </Link>
          </li>
        </ul>

        {/* Profile (Right-Aligned) */}
        <div className="flex space-x-8">
          <button
            onClick={handleLogout}
            className="hidden md:block bg-white text-gray-800 p-2 w-24 rounded-lg font-bold hover:text-gray-500"
          >
            Logout
          </button>
          {/* <button className="hidden md:block bg-white text-gray-800 p-2 w-24 rounded-lg font-bold hover:text-gray-500">
            <Link to="/login">Login</Link>
          </button> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
