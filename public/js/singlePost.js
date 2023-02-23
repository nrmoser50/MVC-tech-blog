const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from new post form
  const title = document.querySelector("#new-post-title").value.trim();
  const content = document.querySelector("#new-post-content").value.trim();

  // Send a POST request to the API endpoint
  const response = await fetch(`api/posts`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect browser to new post page
    document.location.replace("/dashboard");
  } else {
    alert("Cannot add post");
  }
};

document
  .querySelectorAll(".new-post-form")
  .addEventListener("submit", newPostHandler);
