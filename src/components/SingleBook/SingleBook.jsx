
import { useEffect, useState } from "react";
import { useGetBookQuery } from "./SingleBookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateBookMutation } from "../Books/BooksSlice";

export default function SingleBook() {
  const { id } = useParams();
  const { data: aBook, isLoading, error } = useGetBookQuery(id);
  const navigate = useNavigate();
  const [updateBook] = useUpdateBookMutation();

  const [singleBook, setSingleBook] = useState({});

  useEffect(() => {
    if (aBook?.book) {
      setSingleBook(aBook.book);
    }
  }, [aBook]);

  async function handleCheckout(event) {
    event.preventDefault();
    try {
      const result = await updateBook({ id, available: false });
    } catch (error) {
      console.error("Error during checkout", error);
    }
  }


  const returnToList = () => {
    navigate("/");
  };
  return (
    <>
      <div className="bookcontainer">
        <div className="bookdetails">
          <h3>{singleBook.title}</h3>
          <h5>by {singleBook.author}</h5>
          <p>{singleBook.description}</p>
          <p>Available: {singleBook.available ? "✅" : "❌"}</p>
          <p>
            {localStorage.getItem("token") && singleBook.available ? (
              <button className="checkoutbutton" onClick={handleCheckout}>
                Checkout
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="bookdetails">
          <img src={singleBook.coverimage} alt={singleBook.name} />
        </div>
      </div>
      <div className="bookcontainer">
        <button className="returnbutton" onClick={returnToList}>
          Return to List
        </button>
      </div>
    </>
  );
}
