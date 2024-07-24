import { useState } from "react";
import { Facebook, Github, Linkedin, Menu, X } from "lucide-react";
import { useAuth } from "@/providers/user.context";
import Login from "./Login";
import Register from "./Register";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "@/images/logo.png";

const NavBar = () => {
  const { loggedInUser, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path: string) =>
    `hover:text-teal-600 text-lg font-bold transition duration-300 ease-in-out ${
      location.pathname === path ? "text-teal-600" : ""
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white flex justify-between items-center py-4 px-4 md:px-2 lg:px-24 xl:px-52">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
      <div className="custom:hidden">
        <Button onClick={toggleMenu}>{isMenuOpen ? <X /> : <Menu />}</Button>
      </div>
      <div className="hidden custom:flex space-x-4">
        <Link to="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link to="/business" className={getLinkClass("/business")}>
          Business
        </Link>
        <Link to="/add" className={getLinkClass("/add")}>
          Add Business
        </Link>
        <Link to="/contact" className={getLinkClass("/contact")}>
          Contact Us
        </Link>
      </div>
      <div className="hidden custom:flex space-x-4 items-center">
        <a
          className="hover:text-teal-600 transition duration-300 ease-in-out"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-600 transition duration-300 ease-in-out"
        >
          <Github />
        </a>
        <a
          className="hover:text-teal-600 transition duration-300 ease-in-out"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {loggedInUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-10 w-10">
                  <AvatarImage />
                  <AvatarFallback>
                    {loggedInUser.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <div>Logout</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Hello Guest</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsLoginOpen(true)}
                  className="cursor-pointer"
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsRegisterOpen(true)}
                  className="cursor-pointer"
                >
                  Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 custom:hidden">
          <div className="fixed top-0 left-0 w-64 h-full bg-white p-4 shadow-lg z-50">
            <button onClick={toggleMenu} className="mb-4">
              <X />
            </button>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={getLinkClass("/")} onClick={toggleMenu}>
                Home
              </Link>
              <Link
                to="/business"
                className={getLinkClass("/business")}
                onClick={toggleMenu}
              >
                Business
              </Link>
              <Link
                to="/add"
                className={getLinkClass("/add")}
                onClick={toggleMenu}
              >
                Add Business
              </Link>
              <Link
                to="/contact"
                className={getLinkClass("/contact")}
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
              <a
                className="hover:text-teal-600 transition duration-300 ease-in-out"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu}
              >
                <Facebook />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                <Github />
              </a>
              <a
                className="hover:text-teal-600 transition duration-300 ease-in-out"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu}
              >
                <Linkedin />
              </a>
              {loggedInUser ? (
                <div>
                  <Link
                    to="/profile"
                    className="block p-2"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button onClick={logout} className="block p-2">
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      toggleMenu();
                    }}
                    className="block p-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsRegisterOpen(true);
                      toggleMenu();
                    }}
                    className="block p-2"
                  >
                    Register
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
