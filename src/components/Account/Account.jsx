
import { useGetUserQuery } from "./AccountSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reservation from "../Reservations/Reservation";

export default function Account() {
  const { id } = useParams();
  const { data, isSuccess } = useGetUserQuery(id);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [data]);

  return (
    <>
      <div>
        <h2>
          Welcome {user.firstname} {user.lastname}
        </h2>
        <table className="account-table">
          <tbody>
            <tr className="account-header">
              <td>Account Details</td>
              <td>Current Books</td>
            </tr>
            <tr className="account-details">
              <td>
                <p>
                  <b>User ID#:</b> {user.id}
                  <br />
                  <b>Email address:</b> {user.email}
                </p>
              </td>
              <td>
                <Reservation />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
