import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaBookmark } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

const Bottombar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { path: "/home", label: "Home", icon: <FaHome size={20} /> },
    { path: "/people", label: "People", icon: <FaUsers size={20} /> },
    { path: "/saved", label: "Saved", icon: <FaBookmark size={20} /> },
    { path: "/post", label: "Create Post", icon: <IoIosCreate size={20} /> },
  ];

  return (
    <section className=" z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] px-5 py-4 md:hidden bg-blue-600 text-white">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.path}
            className={`${
              isActive ? "bg-blue-800 text-white rounded-[10px]" : ""
            } flex flex-col justify-center items-center gap-1 p-2 transition`}
          >
            {link.icon}
            <p
              className={`text-[14px] font-medium leading-[140%] ${
                isActive ? "text-white" : "text-white"
              }`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
