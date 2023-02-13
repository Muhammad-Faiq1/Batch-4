import React from "react";

function DisplayBooks(props) {
  const books = props?.books;
  const deleteHandler = props?.deleteHandler;
  const editHandler = props?.editHandler;
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Delete</th>
          <th>Edit</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="book-list">
        {books.length > 0 &&
          books.map((singleBook, index) => {
            return (
              <tr key={index}>
                <td>{singleBook.title}</td>
                <td>{singleBook.author}</td>
                <td>{singleBook.isbn}</td>
                <td>
                  <a href="" onClick={(event) => deleteHandler(event, index)}>
                    X
                  </a>
                </td>
                <td>
                  <a href="" onClick={(event) => editHandler(event, index)}>
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default DisplayBooks;
