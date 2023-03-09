async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const post_content = document.querySelector('#content').value;
  const id = window.location.toString().split(`/`)[length - 1
];

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-post-btn').addEventListener('click', editFormHandler);