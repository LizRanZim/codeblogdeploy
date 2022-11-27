// add post button handler

// add conditional logic so that if no post then no event listener, add event listener when post exists, try comment out and save 


const addPostButtonHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/make-post');
};


// delete post button handler from 14-28 profile.js
const delButtonHandler = async (event) => {
  console.log('******')
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // console.log(`/api/posts/${id}`);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    // console.log(`/api/posts/${id}`);

    if (response.ok) {

      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  } else {
    // console.log('******')
  }
};

// Idea is to hide the edit post functionality until someone clicks the edit post button and then they can edit and save the post from here. But this probably needs to move to the dashboard instead from the post handlebars

// ****When I try to create a post and then edit it, it's not passing the id of the newly created post to allow it to be edited, and it's not allowing anything but the first post to be edited, some issue with the proper id being passed. ***

// event handler for edit post to unhide the edit area
const editPostButtonHandler = (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  // remove the class that hides the element
  document.getElementById(id)
    .classList.remove('display-none');
};


// event handler to save edited post button

const saveEditedPostFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  const post_name = document.querySelector('#post-name').value.trim();

  const post_description = document.querySelector('#post-description').value.trim();


  // if post-text exists
  if (post_name && post_description) {
    const postBody = {
      post_name: post_name,
      post_description: post_description,
      post_id: id,
    }

    const response = await fetch(`../api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postBody),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(id)

    if (response.ok) {
      // console.log(response);
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post');
    }
  }

};

// const testFunction = async (event) => {
//   event.preventDefault();
//   // console.log(event.target);
// };


// save post event listener

const savPostBtn = document.querySelectorAll('.save-post-btn');
if (savPostBtn) { savPostBtn.forEach(e => e.addEventListener('click', saveEditedPostFormHandler));
};



// document
//   .querySelector('#save-post-btn')
//   .addEventListener('click', saveEditedPostFormHandler);


// delete button event listener

// document
//   .querySelector('.delete-post-btn')
//   .addEventListener('click', delButtonHandler);

// document.querySelectorAll('.delete-post-btn').forEach(e => e.addEventListener('click', delButtonHandler));

const deletePostBtn = document.querySelectorAll('.delete-post-btn');
if (deletePostBtn) {
  deletePostBtn.forEach(e => e.addEventListener('click', delButtonHandler));
};


// document
//   .querySelector('#test')
//   .addEventListener('click', testFunction);

// add button event listener

document
  .querySelector('#make-post')
  .addEventListener('click', addPostButtonHandler);

// edit post button event listener
// document
//   .querySelectorAll('.edit-post-btn').forEach(e => e.addEventListener('click', editPostButtonHandler));

const editPostBtn = document.querySelectorAll('.edit-post-btn');
if (editPostBtn) {
  editPostBtn.forEach(e => e.addEventListener('click', editPostButtonHandler));
};