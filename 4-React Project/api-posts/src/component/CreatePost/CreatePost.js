import { useState } from "react";
import { baseUrl } from "../../constant";
import Swal from "sweetalert2";

const CreatePost = ({ getPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const createPostFormHandler = async (event) => {
    event.preventDefault();
    if (!title || !body) {
      Swal.fire("Please fill the Vlaues", "", "error");
      return;
    }

    setLoading(true);

    const formPayLoad = {
      title,
      body,
    };
    await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPayLoad),
    })
      .then(async () => {
        setTitle("");
        setBody("");
        let $ = window.$;
        $("#createPost").modal("hide");
        await getPosts();
        Swal.fire("post created successfully!");
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };
  return (
    <>
      <button
        className="btn btn-primary create-post"
        data-toggle="modal"
        data-target="#createPost"
      >
        Create Post
      </button>
      <div
        className="modal fade"
        id="createPost"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="modalLabel">
                Create Post
              </h4>
            </div>
            <div className="modal-body">
              <form
                method="POST"
                id="create-post-form"
                onSubmit={createPostFormHandler}
              >
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="post_title"
                    placeholder="Title"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Body</label>
                  <textarea
                    name=""
                    id="post_body"
                    cols="30"
                    rows="10"
                    placeholder="Body"
                    className="form-control"
                    onChange={(event) => setBody(event.target.value)}
                    value={body}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreatePost;
