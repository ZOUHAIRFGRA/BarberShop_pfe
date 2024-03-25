import { NavLink ,useNavigate} from "react-router-dom";
import { FaBars, FaUser, FaBusinessTime } from "react-icons/fa";
import { MdMiscellaneousServices, MdReviews, MdUpdate } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { fetchBarberProfile, logoutBarber } from "../../../actions/barberActions";


const routes = [
  {
    path: "/barber-interface/analytics",
    name: "Analytics",
    icon: <IoAnalyticsSharp />
    
  },
  {
    path: "/barber-interface/appointments",
    name: "Appointments",
    icon: <FaUser />,
  },
  {
    path: "/barber-interface",
    name: "Services",
    icon:  <MdMiscellaneousServices />,
  },
  {
    path: "/barber-interface/reviews",
    name: "Reviews",
    icon:  <MdReviews />,
  },
  
  {
    path: "/barber-interface/worktime",
    name: "Worktime",
    icon: <FaBusinessTime />,
  },
  {
    path: "/barber-interface/settings",
    name: "Settings",
    icon: <BiCog style={{ cursor: "pointer" }} />,
    exact: true,
    subRoutes: [
      {
        path: "/barber-interface/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/barber-interface/settings/updateProfile",
        name: "updateProfile",
        icon: <MdUpdate />
        ,
      }
    ],
  },
  
  // {
  //   path: "/barber-interface/logout",
  //   name: "Logout",
  //   icon: <FiLogOut />,
  // },
];

const SideBar = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBarberProfile());
  }, [dispatch]);

  const barber = useSelector((state) => state.barber.profile);
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
    dispatch(logoutBarber())
    navigate('/barber-login')

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
                  
                  <img src={barber.image} alt="Profile" className="profile-image" style={{ width: "60px", height: "60px", borderRadius: "50%", marginLeft: "10px" }} />
                  <div className="profile-info">
                    <div>
                      <span className="hello-name">{barber.name}</span><br />
                      <span className="hello-email">{barber.email}</span>
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
