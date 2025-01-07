import { useState, useEffect } from "react";
import { useGetBooksQuery } from "./BooksSlice";
import { useNavigate } from "react-router-dom";
import ToggleBooks from "./ToggleButtonBooks";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(87, 102, 114)",
    color: theme.palette.common.white,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
    const temp = e.target.value.toLowerCase();
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
      <ToggleBooks
        setGridView={setGridView}
        setListView={setListView}
      ></ToggleBooks>

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
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          component={Paper}
          className="list-table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Availability</StyledTableCell>
              <StyledTableCell>Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookArr?.map((p) => (
              <StyledTableRow key={p.id}>
                <StyledTableCell>{p.title}</StyledTableCell>
                <StyledTableCell>{p.author}</StyledTableCell>
                <StyledTableCell
                  className={p.available ? "available" : "unavailable"}
                >
                  {p.available ? "Available" : "Unavailable"}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    className="listdetailbutton"
                    onClick={() => seeBookDetails(p.id)}
                  >
                    Details
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </article>
  );
}
