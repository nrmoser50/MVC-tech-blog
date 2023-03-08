async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const post_content = document.querySelector('#content').value;
    const id = window.location.pathname.split('/')[2];

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content,
            id
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
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);