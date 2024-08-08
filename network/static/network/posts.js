function loadPosts(page, postsContainerId, username = "", following = false) {

    // Get start and end post ids to load
    let post_start_i = postsIncrement*(page-1);
    let post_end_i = postsIncrement*(page);

    postsGET(post_start_i, post_end_i, username = username, following = following)
    .then(posts => {

        let postsContainer = document.querySelector(postsContainerId);

        // Clear all current posts
        postsContainer.innerHTML = "";

        // For every post
        posts.forEach(post => {

            // Create post HTML element
            postElement = createPostElement(post);

            // Add to posts container
            postsContainer.append(postElement);

        });

    });

}