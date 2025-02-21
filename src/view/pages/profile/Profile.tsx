import { useUser } from "@context/UserContext";

function Profile() {
  const { user, signIn, signOut } = useUser();

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
