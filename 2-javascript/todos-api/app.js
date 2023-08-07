// common var
const apiUrl = `https://jsonplaceholder.typicode.com`;
// Dom var()
const todosListinig = document.querySelector("#todos-listing");
const createPostForm = document.querySelector("#create-post-form");
const postTitleInput = document.querySelector("#post_title");
const postBodyInput = document.querySelector("#post_body");

// Get Record from API when Js file call
const getPostData = async function () {
  await fetch(`${apiUrl}/posts`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data, "data")
      if (data?.length > 0) {
        let output = "";
        data.forEach(function (singlePost) {
          output += ` 
     <tr>
      <td>${singlePost.id}</td>
      <td>${singlePost.userId}</td>
      <td>${singlePost.title}</td>
      <td><a class="btn btn-primary edit-btn" data-post-id="${singlePost.id}"  data-toggle="modal" href="#edit-post">Edit</a></td>
      <td><a href="#" class="btn btn-danger delete-btn " data-post-id = ${singlePost.id} >Delete</a></td>
     </tr>`;
        });
        // console.log(output)
        todosListinig.innerHTML = output;
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};
getPostData();

//   Event Listners
// post record
createPostForm.addEventListener("submit", postFormHandler);

function postFormHandler(event) {
  event.preventDefault();
  const title = postTitleInput.value;
  const body = postBodyInput.value;

  const formBody = {
    title,
    body,
  };

  fetch(`${apiUrl}/posts`, {
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formBody),
  })
    .then(function () {
      // console.log(data, "data")
      postTitleInput.value = "";
      postBodyInput.value = "";
      $("#create-todo").modal("hide");
      getPostData();
    })
    .catch(function (error) {
      console.error(error);
    });
}

// event bubling
// delete post

todosListinig.addEventListener("click", tbodyTodoListinigHandler);
function tbodyTodoListinigHandler(event) {
  event.preventDefault();
  // console.log(event.target, "current element");
  const currentElement = event.target;
  if (currentElement.classList.contains("delete-btn")) {
    const allDataAtributeValues = event.target.dataset;
    if (confirm("are you sure")) {
      // currentElement.parentElement.parentElement.remove();
      fetch(`${apiUrl}/posts/${allDataAtributeValues.postId}`, {
        method: "DELETE",
      })
        .then(function () {
          // console.log(response,"response")
          getPostData();
        })
        .catch(function () {
          console.error("error");
        });
    }
  }
}


// edit and update post



todosListinig.addEventListener("click", tbodyTodoListinigHandler);
function tbodyTodoListinigHandler(event) {
  event.preventDefault();
  // console.log(event.target, "current element");
  const currentElement = event.target;
  if (currentElement.classList.contains("edit-btn")) {
    const allDataAtributeValues = event.target.dataset;

    // currentElement.parentElement.parentElement.remove();
    fetch(`${apiUrl}/posts/${allDataAtributeValues.postId}`)
      .then(function (response) {
       return response.json()

      })
      .then(function (data) {
        
        const editPostTitle = document.querySelector("#edit_post_title");
        const editPostBody = document.querySelector("#edit_post_body");
        editPostTitle.value = data.title;
        editPostBody.value = data.body;
      })
      .catch(function () {
        console.error("error");
      });

  }
}