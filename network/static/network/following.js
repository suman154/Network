const postsIncrement = 10; // Number of posts to be loaded at a time
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    // https://docs.djangoproject.com/en/dev/ref/templates/builtins/#json-script
    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    // Load first page by default
    pageCurrent = 1;

    // Create pagination
    createPagination(pageCurrent, "#FollowingPaginationContainer", "#FollowingPostsContainer", username = "", following = true);

    // Load all recent posts inside AllPostsContainer
    loadPosts(pageCurrent, "#FollowingPostsContainer", username = "", following = true);

});