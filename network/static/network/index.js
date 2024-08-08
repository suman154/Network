const postsIncrement = 10; // Number of posts to be loaded at a time
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    // https://docs.djangoproject.com/en/dev/ref/templates/builtins/#json-script
    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    // Load first page by default
    pageCurrent = 1;

    // Create pagination
    createPagination(pageCurrent, "#AllPostsPaginationContainer", "#AllPostsContainer");

    // Load all recent posts inside AllPostsContainer
    loadPosts(pageCurrent, "#AllPostsContainer");

    // Add event handler to post submit form if user is logged in 
    if (document.querySelector('#NewPostForm')) {
        document.querySelector('#NewPostForm').onsubmit = () => {

            // Collect user input
            let postText = document.querySelector('#NewPostText');
            let text = postText.value;
            
            // Ignore empty posts 
            if (text) {
                newPOST(text) 
                .then(post => {
                    // Clear input field
                    postText.value = "";
                    loadPosts(pageCurrent, "#AllPostsContainer");
                });
            } else {
                loadPosts(pageCurrent, "#AllPostsContainer");
            }

            return false;
        };
    }

});