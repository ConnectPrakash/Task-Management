import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
  const [userDetail, setUserDetail] = useState(null);

const {id}= useParams();

  useEffect(() => {
    if (!id) return; // ✅ Ensures API call only runs when `userId` is set

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://task-management-1-al5b.onrender.com/user/${id}`);
        setUserDetail(response.data.data || {});
        console.log("User Details:", response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]); // ✅ Runs when `userId` changes

  return (
    <div>
      <h2>User Detail Page</h2>
      <div className="userDetails">
        {userDetail ? (
          <>
            <p>Name: {userDetail.name || "N/A"}</p>
            <p>Email: {userDetail.email || "N/A"}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
