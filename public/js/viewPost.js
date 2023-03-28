const addComment = async (event) => {

  const body = document.querySelector('#commentText').value.trim();

  const currentUrl = window.location.toString().split('/');
  const postId = currentUrl[currentUrl.length - 1];

  const username = document.querySelector('#username').value.trim();

  if (body && postId) {

    const response = await fetch(`/api/comments/` + postId, {
        method: 'POST',
        body: JSON.stringify({ body, postId, username}),
        headers: {
            'Content-Type': 'application/json',
        },
     });  

    document.location.reload();
}};


const addCommentButton = document.querySelector('.addCommentBtn');
addCommentButton.addEventListener('click', addComment);
