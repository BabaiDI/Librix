import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, signIn, signOut } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <p>Pending...</p>;
  }

  return (
    <div>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
