import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./notification.css";
function Notification() {
  const handleClick = () => {
    toast("You have a new notification!");
  };

  return (
    <div>
      <IoIosNotificationsOutline
        className="notification"
        style={{
          fontSize: "2.4rem",
          cursor: "pointer",
          marginRight: "6rem",
        }}
        onClick={handleClick}
      />

      <ToastContainer />
    </div>
  );
}

export default Notification;
