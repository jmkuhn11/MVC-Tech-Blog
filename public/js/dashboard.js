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

const newPost = async (event) => {

  const title = document.querySelector('#postTitle').value.trim();
  const body = document.querySelector('#postBody').value.trim();

  if (title && body) {

    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
            'Content-Type': 'application/json',
        },
     });  

    document.location.reload();
}};

const updatePost = async (event) => {

  const id = document.querySelector('#updatePostId').value.trim();
  const title = document.querySelector('#updatePostTitle').value.trim();
  const body = document.querySelector('#updatePostBody').value.trim();

  if (title && body && id) {

    const response = await fetch(`/api/posts/` + id, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
            'Content-Type': 'application/json',
        },
     });  

    document.location.reload();
}};

const editPost = async (event) => {

  updateDiv.style.display = 'block';
  newPostDiv.style.display = 'none';
  allPostsDiv.style.display = 'none';

  if (event.target.hasAttribute('data-id')) {
    const postId = event.target.getAttribute('data-id');
    const updatePostInput = document.querySelector('#updatePostId');
    updatePostInput.value = postId;
    
    const updatePostTitleDiv = document.querySelector('#title' + postId);
    const title = updatePostTitleDiv.innerText;
    const updatePostTitle = document.querySelector('#updatePostTitle');
    updatePostTitle.value = title;

    const updatePostBodyDiv = document.querySelector('#body' + postId);
    const body = updatePostBodyDiv.innerText;
    const updatePostBody = document.querySelector('#updatePostBody');
    updatePostBody.value = body;
  }

};

function cancelUpdate() {
  updateDiv.style.display = 'none';
  newPostDiv.style.display = 'block';
  allPostsDiv.style.display = 'block';
}

const deletePostButtons = document.querySelectorAll('.deletePostBtn');
deletePostButtons.forEach((button) => {
  button.addEventListener('click', deletePost);
});

const newPostButton = document.querySelector('.newPostBtn');
newPostButton.addEventListener('click', newPost);

const updatePostButton = document.querySelector('.updatePostBtn');
updatePostButton.addEventListener('click', updatePost);

const editPostButtons = document.querySelectorAll('.editPostBtn');
editPostButtons.forEach((button) => {
  button.addEventListener('click', editPost);
});

const updateDiv = document.querySelector('.updatePostDiv');
updateDiv.style.display = 'none';

const newPostDiv = document.querySelector('.newPostDiv');
newPostDiv.style.display = 'block';

const allPostsDiv = document.querySelector('.allPostsDiv');
allPostsDiv.style.display = 'block';

const cancelUpdateButton = document.querySelector('.cancelUpdateBtn');
cancelUpdateButton.addEventListener('click', cancelUpdate);