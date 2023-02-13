import React, { useState } from "react";
import "./Home.less";
import DisplayBooks from "../../DisplayBook/Component/DisplayBooks";

function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [books, setBooks] = useState("");
  const [isEdit, setIsEdit] = useState(null);

  const titleInputHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const authorInputHandler = (event) => {
    event.preventDefault();
    setAuthor(event.target.value);
  };
  const isbnInputHandler = (event) => {
    event.preventDefault();
    setIsbn(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (title === "" || author === "" || isbn === "") {
      alert("Enter the Value");
      return;
    }
    if (isEdit === null) {
      createRecord();
    } else {
      updateRecord();
    }
  };
  const createRecord = () => {
    const bookObject = { title, author, isbn };
    setBooks([...books, bookObject]);

    setTitle("");
    setAuthor("");
    setIsbn("");
  };
  const updateRecord = () => {
    const currentIndex = isEdit;
    const tempBooks = [...books];
    tempBooks[currentIndex].title = title;
    tempBooks[currentIndex].author = author;
    tempBooks[currentIndex].isbn = isbn;

    setBooks(tempBooks);
    setIsEdit(null);

    setTitle("");
    setAuthor("");
    setIsbn("");
  };
  const deleteHandler = (event, index) => {
    event.preventDefault();
    if (window.confirm("Are you Sure")) {
      const tempBooks = [...books];
      tempBooks.splice(index, 1);
      setBooks(tempBooks);
    }
  };
  const editHandler = (event, index) => {
    event.preventDefault();
    const tempBook = [...books];
    const currentbook = tempBook[index];
    setTitle(currentbook.title);
    setAuthor(currentbook.author);
    setIsbn(currentbook.isbn);
    setIsEdit(index);
  };
  return (
    <div className="container">
      <h1>Add Book</h1>
      <form id="book-form" onSubmit={formSubmitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            className="u-full-width"
            onChange={titleInputHandler}
            value={title}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            id="author"
            className="u-full-width"
            onChange={authorInputHandler}
            value={author}
          />
        </div>
        <div>
          <label>ISBN#</label>
          <input
            type="number"
            id="isbn"
            className="u-full-width"
            onChange={isbnInputHandler}
            value={isbn}
          />
        </div>
        <div>
          <button type="submit" classNa me="u-full-width">
            {isEdit === null ? "Submit" : "Update"}
          </button>
        </div>
      </form>
      <DisplayBooks
        books={books}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
}

export default Home;
