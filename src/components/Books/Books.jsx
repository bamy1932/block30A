import { useState, useEffect } from "react";
import { useGetBooksQuery } from "./BooksSlice";
import { useNavigate } from "react-router-dom";
import ToggleBooks from "./ToggleButtonBooks";



export default function Books() {
  const { data: bookList, isLoading, error } = useGetBooksQuery();

  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(true);
  const setListView = () => {
    setIsGridView(false);
  };

  const setGridView = () => {
    setIsGridView(true);
  };

  const seeBookDetails = (id) => {
    navigate(`/books/${id}`);
  };
  const [bookFilter, setBookFilter] = useState({
    bookSearch: "",
  });

  const [bookArr, setBookArr] = useState();

  useEffect(() => {
    if (bookList?.books) {
      setBookArr(bookList?.books);
    }
  }, [bookList]);

  const update = (e) => {
    setBookFilter({
      bookSearch: e.target.value,
    });
    const temp = e.target.value;
    if (temp.length === 0) {
      setBookArr(bookList?.books);
    } else {
      const filteredBooks = bookList?.books.filter((element) => {
        if (
          element.title.toLowerCase().includes(temp) ||
          element.author.toLowerCase().includes(temp)
        ) {
          return element;
        }
      });
      setBookArr(filteredBooks);
    }
  };

  return (
    <article>
      <h2>Library Books</h2>
      <form>
        <label>
          <p className="searchbar">
            Search by Title or Author:{" "}
            <input
              className="inputfield"
              name="bookSearch"
              value={bookFilter.bookSearch}
              onChange={update}
            />
          </p>
        </label>
      </form>
      <p>
        {isLoading && "Loading books..."}
        {error && "Error loading books..."}
      </p>
      <ToggleBooks setGridView={setGridView} setListView={setListView}></ToggleBooks>
      
      {isGridView ? (
        <div className="grid-container">
          <ul className="books">
            {bookArr?.map((p) => (
              <li key={p.id}>
                <p className="booktitle">{p.title} </p>
                <p className="bookauthor">by {p.author}</p>
                <figure>
                  <div className="card">
                    <div className="ribbon">
                      <span
                        className={p.available ? "available" : "unavailable"}
                      >
                        {p.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <img
                      src={p.coverimage}
                      alt={p.name}
                      className="bookimage"
                    />
                  </div>
                </figure>

                <button
                  className="detailbutton"
                  onClick={() => seeBookDetails(p.id)}
                >
                  Click for Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <table className="list-table">
          <tbody>
            <tr className="title-row">
              <td>Title</td>
              <td>Author</td>
              <td>Availability</td>
              <td>Details</td>
            </tr>
            {bookArr?.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.author}</td>
                <td className={p.available ? "available" : "unavailable"}>
                  {p.available ? "Available" : "Unavailable"}
                </td>
                <td className="details-cell">
                  <button
                    className="listdetailbutton"
                    onClick={() => seeBookDetails(p.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}
