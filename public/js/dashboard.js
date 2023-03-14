const deletePost = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    if (id) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
    }
    document.location.reload();
  }

};

const deletePostButtons = document.querySelectorAll('.deletePostBtn');
deletePostButtons.forEach((button) => {
  button.addEventListener('click', deletePost);
});

