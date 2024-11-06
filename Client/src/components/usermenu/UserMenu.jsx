import { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
//import PropTypes from "prop-types"; // Make sure to import PropTypes
import { ClientContext } from "../../App";

function UserProfile({ username, userid }) {
  const { user } = useContext(ClientContext);
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    const randomColorGenerator = () => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      if (
        randomColor.length !== 6 ||
        randomColor === "ffffff" ||
        randomColor === "000000"
      ) {
        randomColorGenerator();
      } else {
        setRandomColor(`#${randomColor}`);
      }
    };
    randomColorGenerator();
  }, []);

  return (
    <div className="user-profile">
      <Avatar
        name={username || user?.username}
        size="40"
        round={true}
        color={randomColor}
      />
    </div>
  );
}

// UserProfile.propTypes = {
//   username: PropTypes.string,
//   userid: PropTypes.string.isRequired,
// };

export default UserProfile;
