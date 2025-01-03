import {
  useGetReservationQuery,
  useDeleteReservationMutation,
} from "./ReservationSlice";
import { useState, useEffect } from "react";

export default function Reservation() {
  const { data: reservation, isSuccess } = useGetReservationQuery();
  const [deleteReservation] = useDeleteReservationMutation();
  const [books, setBooks] = useState([]);

  async function returnBook(id) {
    try {
      await deleteReservation({
        id,
        available: !reservation.available,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setBooks(reservation.reservation);
    }
  }, [isSuccess, reservation]);

  useEffect(() => {

  }, [books]);

  let $reservationList;
  if (books.length === 0) {
    $reservationList = <p>You currently have no books checked out.</p>;
  } else {
    $reservationList = (
      <>
        {books?.map((book, index) => {
          return (
            <ul className="reservedbooks" key={index}>
             
             <li> 
                <b>{book.title}</b><br/> by {book.author}
                
              </li>
              <li><button
                  className="reservationbutton"
                  onClick={() => returnBook(book.id)}
                >
                  Return
                </button></li>
            </ul>
          );
        })}
      </>
    );
  }

  return (
    <>
      {$reservationList}
    </>
  );
}
