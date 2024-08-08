const postsIncrement = 10; // Number of posts to be loaded at a time
let pageCurrent;
let userIsAuthenticated;

document.addEventListener("DOMContentLoaded", function() {

    // https://docs.djangoproject.com/en/dev/ref/templates/builtins/#json-script
    const requestedUsername = JSON.parse(document.getElementById("username").textContent);
    userIsAuthenticated = JSON.parse(document.getElementById("user_is_authenticated").textContent);

    // Load first page by default
    pageCurrent = 1;

    // Create pagination
    createPagination(pageCurrent, "#ProfilePaginationContainer", "#ProfilePostsContainer", requestedUsername);

    // Load all recent posts inside AllPostsContainer
    loadPosts(pageCurrent, "#ProfilePostsContainer", requestedUsername);

    // Load posts/following/followers counts
    loadCounts(requestedUsername, "#ProfileFollowersContainer");

    // Add unfollow/follow button 
    if (document.querySelector("#ProfileFollowButton")) showFollow(requestedUsername, "#ProfileFollowButton", "#ProfileFollowersContainer");

});

function loadCounts(requestedUsername, countContainerId) {

    countPostsGET(requestedUsername).then(count => {
        document.querySelector(countContainerId).innerHTML = `Posts (${count.posts_count})`;
    })
    .then(() => {
        countFollowingGET(requestedUsername).then(count => {
            document.querySelector(countContainerId).innerHTML += ` | Following (${count.following_count})`;
        })
        .then(() => {
            countFollowersGET(requestedUsername).then(count => {
                document.querySelector(countContainerId).innerHTML += ` | Followers (${count.followers_count})`;
            });
        });
    });

}