const viewPost = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    document.location.replace(`/post/${id}`);
  }

};

const viewPostButtons = document.querySelectorAll('.viewPostBtn');
viewPostButtons.forEach((button) => {
  button.addEventListener('click', viewPost);
});

