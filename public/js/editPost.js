const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const post_content = document.querySelector("#content").value;
  

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

const editButtons = document.querySelectorAll(".edit-post-btn");
editButtons.forEach((button) => {
  button.addEventListener("click", editFormHandler);
});

