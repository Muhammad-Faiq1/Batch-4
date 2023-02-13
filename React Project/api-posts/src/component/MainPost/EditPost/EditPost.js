import React, { memo, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../../constant";
function EditPost({ editPostData, getPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPostData) {
      const { body, title } = editPostData;
      setBody(body);
      setTitle(title);
    }
  }, [editPostData]);

  const updatePostFormHandler = async (event) => {
    event.preventDefault();

    if (!title || !body) {
      Swal.fire("please fill the values", "", "error");
      return;
    }

    setLoading(true);

    // const formPayload = {title:title,body:body};
    const formPayload = { title, body };

    await fetch(`${baseUrl}/posts/${editPostData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPayload),
    })
      .then(async () => {
        setTitle("");
        setBody("");

        let $ = window.$;
        $("#updatePost").modal("hide");
        await getPosts();

        Swal.fire("post updated successfully!");
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="updatePost"
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
                Update Post
              </h4>
            </div>
            <div className="modal-body">
              <form
                method="POST"
                id="create-post-form"
                onSubmit={updatePostFormHandler}
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
    </React.Fragment>
  );
}

export default memo(EditPost);
