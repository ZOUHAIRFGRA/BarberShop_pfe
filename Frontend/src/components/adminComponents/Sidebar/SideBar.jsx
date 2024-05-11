import { NavLink ,useNavigate} from "react-router-dom";
import { FaBars, FaCut } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {  BiSolidCity, BiUser } from "react-icons/bi";
import { useState } from "react";
import {  MdReviews } from "react-icons/md";

import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector,useDispatch } from "react-redux";
import { logoutAdmin } from "../../../actions/adminActions";


const routes = [
  {
    path: "/admin-interface",
    name: "Cities",
    icon: <BiSolidCity />
    
  },
  {
    path: "/admin-interface/barbers",
    name: "Barbers",
    icon: <FaCut />,
  },
  {
    path: "/admin-interface/reviews",
    name: "Reviews",
    icon: <MdReviews />,
  },
  {
    path: "/admin-interface/users",
    name: "Users",
    icon: <BiUser />,
  },
  
];

const SideBar = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const handleLogout = () => {
    dispatch(logoutAdmin())
    navigate('/login')

  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="profile-section"
                >
                  
                  <img src={admin.image.url || "https://img.url"} alt="Profile" className="profile-image" style={{ width: "60px", height: "60px", borderRadius: "50%", marginLeft: "10px" }} />
                  <div className="profile-info">
                    <div>
                      <span className="hello-name">{admin.name}</span><br />
                      <span className="hello-email">{admin.email}</span>
                    </div>
                  </div>
                  <hr />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
            <IoSearchOutline />

 

            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }

              return (
                <NavLink to={route.path} key={index} className="link">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className="logout-button" onClick={handleLogout}>
        <div className="icon"><FiLogOut /></div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="link_text"
            >
              Logout
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
