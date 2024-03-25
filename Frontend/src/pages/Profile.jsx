import React, { useEffect, useState } from "react";
import "./Profile.css";
import UpdateProfile from "../components/UpdateProfile";
import Appointements from "../components/Appointements";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../actions/userActions";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
const Profile = ({ setContentVisible }) => {
  const [currentContent, setCurrentContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUser());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchData();
    setContentVisible(true);
  }, [dispatch, setContentVisible]);

  const handleLinkClick = (content) => {
    setCurrentContent(content);
  };

  if (loading) {
    // Display the loading spinner while the data is being fetched
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color={"#123abc"} loading={loading}  size={170} />;
    </div>
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }


  // eslint-disable-next-line no-unused-vars
  const { name, email, CIN, address, phoneNumber, username } = user;
  const renderMainContent = () => {
    switch (currentContent) {
      case "profile":
        return setCurrentContent("");
      case "appointments":
        return (
          <div className="div2">
            <Appointements />
          </div>
        );
      case "settings":
        return (
          <div className="div2">
            <UpdateProfile />
          </div>
        );
      // Add more cases for additional links as needed
      default:
        return (
          <div className="div2">
            <h2>Welcome, {username}!</h2>
            <div className="div3">
              <div className="div4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 89">
                  <path
                    transform="translate(-910 -381)"
                    fill="#c7c7c7"
                    d="m946.933512 381.275837 31.356388 24.930656c2.028202 1.612571 3.2101 4.062205 3.2101 6.653341v54.140166c0 1.380712-1.119288 2.5-2.5 2.5h-66c-1.380712 0-2.5-1.119288-2.5-2.5v-54.140166c0-2.591136 1.181898-5.04077 3.2101-6.653341l31.356388-24.930656c.5465-.434508 1.320524-.434508 1.867024 0zm-1.244683.782746-31.356388 24.930656c-1.78959 1.422857-2.832441 3.584299-2.832441 5.870595v54.140166c0 .828427.671573 1.5 1.5 1.5h66c.828427 0 1.5-.671573 1.5-1.5v-54.140166c0-2.286296-1.042851-4.447738-2.832441-5.870595l-31.356388-24.930656c-.182167-.144836-.440175-.144836-.622342 0zm.311171 33.441417c9.112698 0 16.5 7.387302 16.5 16.5s-7.387302 16.5-16.5 16.5c-3.603879 0-6.937901-1.1554-9.651851-3.115987l-.123401.062628-.124989-.245614c-4.007537-3.010292-6.599759-7.802936-6.599759-13.201027 0-9.112698 7.387302-16.5 16.5-16.5zm-.07949 7c-3.018757 0-4.970805 1.626324-5.08302 3.073933l-.005111.131059v3.865259l-.174711.149667c-.937676.803265-.978445 2.412575-.153778 3.137359l.117815.093192.150656.106891.044973.179165c.406766 1.620477 1.081279 2.703862 2.011726 3.281597l.177455.102407.264215.141293v3.94143c0 .781588-1.576587 1.89558-5.087685 3.738988l-.82369.427829c2.468788 1.660755 5.441535 2.629931 8.640645 2.629931 3.223366 0 6.216923-.983928 8.696712-2.667825l-.336662-.167746c-.479217-.245554-1.080615-.579072-1.814393-1.005266l-.881886-.518814-1.419917-.855336-2.1193-1.303251v-4.318401l.387959-.089202c1.095488-.251884 1.862345-1.196117 2.292133-2.91758l.061939-.26406.035251-.160154.123255-.108168c.722874-.634396.828367-2.314356.066716-3.317817l-.10926-.132481-.127651-.142435v-3.826472c0-1.599681-1.797524-3.204992-4.934386-3.204992zm.07949-6c-8.560414 0-15.5 6.939586-15.5 15.5 0 4.958423 2.328259 9.373052 5.951166 12.210277l.920415-.476774c3.045308-1.5977 4.788068-2.723344 4.894016-3.005583l.005133-.024668v-3.354767c-1.122398-.709472-1.912077-1.951769-2.379436-3.699218-1.235182-1.029141-1.290392-3.119037-.190902-4.384104l.131987-.142202v-3.417969c0-2.063426 2.453568-4.204992 6.088131-4.204992 3.571541 0 5.817116 1.923665 5.929926 4.037728l.00446.167264v3.453528c1.067482 1.357051.975957 3.546442-.045827 4.598932-.438522 1.863616-1.268944 3.085727-2.497279 3.605835l-.187236.072743v2.988552l1.217267.747427 1.416739.856478c2.109653 1.262512 3.452534 2.001743 3.847973 2.137294 3.58974-2.839382 5.893467-7.233549 5.893467-12.165781 0-8.560414-6.939586-15.5-15.5-15.5z"
                  ></path>
                </svg>
              </div>
              <p className="p1">Profile Start page</p>
              <small>Here you'll see your profile summary.</small>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Aside */}
        <aside className="col-lg-3 mb-3">
          <div className="text-center d-flex mb-3">
            <img
              src="https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png"
              alt="Profile"
              className="rounded-circle img-fluid shadow me-2"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column">
              <h4 className="mt-4">{name}</h4>
              <p className="">{phoneNumber}</p>
            </div>
          </div>
          <ul className="link-list">
            <li
              className="link-item"
              onClick={() => handleLinkClick("profile")}
            >
              Profile
            </li>
            <li
              className="link-item"
              onClick={() => handleLinkClick("appointments")}
            >
              Appointments
            </li>
            <li
              className="link-item"
              onClick={() => handleLinkClick("settings")}
            >
              Settings
            </li>
            {/* Add more links as needed */}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-lg-9 min-vh-100">{renderMainContent()}</main>
      </div>
    </div>
  );
};

export default Profile;
