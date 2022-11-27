const makeCommentFormHandler = async (event) => {
event.preventDefault();

const comment_text = document.querySelector('#comment_text').value.trim();
const postId = document.querySelector('#save-comment-btn').dataset.postId;

// if comment-text exists
if (comment_text)
{
    const response = await fetch ('../api/comments', {
    method: 'POST',
    body: JSON.stringify({comment_text, post_id:postId}),
    headers: { 'Content-Type': 'application/json' },
});
console.log(response)
console.log(postId, '/n-------- POST ID')
    if (response.ok) {
        console.log(response);
        document.location.reload();
    } else {
        alert('Failed to make comment');
      }
}
};

document
  .querySelector('#save-comment-btn')
  .addEventListener('click', makeCommentFormHandler);
