import { useParams } from "react-router-dom";

function UserDetails() {
  const params = useParams();
  return (
    <div>
      <h2>User Details</h2>
      <p>You selected user with ID: {params.id}</p>
    </div>
  );
}
export default UserDetails;