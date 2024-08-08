function createPostElement(post) {

    let postElement = document.createElement("div");
    postElement.className = "card";

    let postBody = document.createElement("div");
    postBody.id = `PostBody${post.id}`;
    postBody.className = "card-body";

    let postTitle = document.createElement("h6");
    postTitle.className = "card-title"
    postTitle.style.marginBlockEnd = "0px";

    let postAnchor = document.createElement("a");
    postAnchor.innerHTML = `@${post.user}`;
    postAnchor.href = `/profile/${post.user}`;
    postAnchor.style.color = "black";

    postTitle.append(postAnchor);

    let postTimestamp = document.createElement("small");
    postTimestamp.className = "card-text text-muted";
    postTimestamp.innerHTML = `${post.timestamp}`;

    let postText = document.createElement("p");
    postText.id = `PostText${post.id}`;
    postText.className = "card-text";
    postText.style.marginBlockStart = "8px";
    postText.innerHTML = post.text;

    postBody.append(postTitle, postTimestamp, postText);

    // If user is authenticated add like button
    if (userIsAuthenticated) {
        let postLikeButton = createLikeButton(post);
        postBody.append(postLikeButton);
    }

    // If user is post's creator, add edit button
    isCreatorGET(post.id)
    .then(isCreator => {
        if(isCreator.iscreator) {
            let postEditButton = createEditButton(post);
            postBody.append(postEditButton);
        } 
    });

    postElement.append(postBody);

    return postElement;

}

function createLikeButton(post) {

    let likeButton = document.createElement("button");
    likeButton.style.marginRight = "10px";
    likeButton.id = `PostLikeButton${post.id}`;

    isLikedGET(post.id).then(isliked => {
        // If user liked the post
        if(isliked.liked) {

            likeButton.className = "btn btn-sm btn-success";

            // Get total like count
            countLikesGET(post.id).then(count => {
                likeButton.innerHTML = `Liked ${count.likes_count}`;
            });

            // Add 'onlclick' event handler to unlike
            likeButton.onclick = () => {unlike(post.id, `#${likeButton.id}`)};

        // If user hasn't liked the post
        } else {

            likeButton.className = "btn btn-sm btn-primary";

            // Get total like count
            countLikesGET(post.id).then(count => {
                likeButton.innerHTML = `Like ${count.likes_count}`;
            });

            // Add 'onlclick' event handler to like
            likeButton.onclick = () => {like(post.id, `#${likeButton.id}`)};

        }
    });

    return likeButton;
}

function createPagination(pageCurrent, paginationContainerId, postsContainerId, username = "", following = false) {

    let paginationContainer = document.querySelector(paginationContainerId);
    paginationContainer.innerHTML = "";

    countPostsGET(username, following)
    .then(count => {

        // Calculate total number of pages
        let pageCount = Math.ceil(count.posts_count/postsIncrement);

        paginationList = document.createElement("ul");
        paginationList.className = "pagination justify-content-center";
        paginationList.id = "PaginationList";

        // For every page
        for(let page = 1; page < pageCount + 1; page++) {

            let pageItem = document.createElement("li");
            pageItem.className = "page-item";

            let pageItemButton = document.createElement("button");
            pageItemButton.className = page == pageCurrent? "btn btn-primary": "btn btn-light";
            pageItemButton.id = `PageButton${page}`;
            pageItemButton.innerHTML = `${page}`;
            
            // Add 'onlclick' event handler to go to page 
            pageItemButton.addEventListener("click", () => {
                pageCurrent = page;
                // Load posts for the page  
                loadPosts(page, postsContainerId, username, following);
                // Update pagination
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            pageItem.append(pageItemButton);

            paginationList.append(pageItem);

        }

        // Add Next button if there is more than one page and current page is not last page
        if (pageCount > 1 && pageCurrent < pageCount) {

            let pageNextButton = document.createElement("button");
            pageNextButton.className = "btn btn-light";
            pageNextButton.id = "PageButtonNext";
            pageNextButton.innerHTML = "Next";

            // Add 'onlclick' event handler to go to next page
            pageNextButton.addEventListener("click", () => {
                pageCurrent++;
                // Load posts for the next page  
                loadPosts(pageCurrent, postsContainerId, username, following);
                // Update pagination
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            paginationList.append(pageNextButton);
        }

        // Add Previous button if current page is not the first one
        if (pageCurrent > 1) {

            let pagePrevButton = document.createElement("button");
            pagePrevButton.className = "btn btn-light";
            pagePrevButton.id = "PagePrevNext";
            pagePrevButton.innerHTML = "Previous";

            // Add 'onlclick' event handler to go to previous page
            pagePrevButton.addEventListener("click", () => {
                pageCurrent--;
                // Load posts for the previuos page  
                loadPosts(pageCurrent, postsContainerId, username, following);
                // Update pagination
                createPagination(pageCurrent, paginationContainerId, postsContainerId, username, following);
            });

            paginationList.prepend(pagePrevButton);
        }

        paginationContainer.append(paginationList);

    });

}