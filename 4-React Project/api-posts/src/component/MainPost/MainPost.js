import { useEffect, useState } from "react";
import Posts from "../Post/Posts";
import Spinner from "../Spinner/Spinner";
import { baseUrl } from "../../constant";
import Swal from "sweetalert2";
import CreatePost from "../CreatePost/CreatePost";
import EditPost from "./EditPost/EditPost";

const MainPost = function () {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editPostData, setEditPostData] = useState(null)
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    setLoading(true);

    await fetch(`${baseUrl}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));

    setLoading(false);
  };
  const confirmationModal = async () => {
    const response = await Swal.fire({
      title: "Do you want to delete it?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });

    return response;
  };

  const deleteHandler = async (event, postId) => {
    event.preventDefault();
    const confirmBtnResponse = await confirmationModal();

    if (confirmBtnResponse) {
      setLoading(true);
      await fetch(`${baseUrl}/posts/${postId}`, {
        method: "DELETE",
      })
        .then(async () => {
          await getPosts();
        })
        .catch((error) => console.log(error));

      setLoading(false);

      Swal.fire("Post is Deleted!", "", "success");
    } else {
      Swal.fire("Post is not Deleted!", "", "info");
    }
  };
  const editPostHandler = (event, postId) => {
    event.preventDefault();
    fetch(`${baseUrl}/posts/${postId}`,)
      .then((response) => response.json())
      .then((data) => setEditPostData(data))
      .catch((error) => console.log(error))
  };

  return (
    <div className="container main-post">
      {loading && <Spinner />}
      <CreatePost getPosts={getPosts} />
      <EditPost editPostData={editPostData} getPosts={getPosts} />
      <Posts
        posts={posts}
        deleteHandler={deleteHandler}
        editPostHandler={editPostHandler}
      />
    </div>
  );
};
export default MainPost;
