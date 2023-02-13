const Posts = function (props) {
  const { posts, deleteHandler, editPostHandler } = props;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Post Id</th>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 &&
          posts.map((singlePost, index) => {
            return (
              <tr key={index}>
                <th>{singlePost.id}</th>
                <th>{singlePost.title}</th>
                <th>
                  <button className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#updatePost"
                    onClick={(event) => editPostHandler(event, singlePost.id)}>Edit</button>
                </th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={(event) => deleteHandler(event, singlePost.id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default Posts;
