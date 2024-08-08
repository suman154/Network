async function postsGET(start, end, username = '', following = false) {

    let url = following ? `/posts/following?start=${start}&end=${end}`: username? `/posts?username=${username}&start=${start}&end=${end}`: `/posts?start=${start}&end=${end}`;

    const response = await fetch(url, {
        method: "GET",
    });
    return await response.json();

}

async function countPostsGET(username, following = false) {

    let url = following? `/countposts/following`:username? `/countposts?username=${username}`: `/countposts`;

    const response = await fetch(url, {
        method: "GET",
    });
    return await response.json();
}

async function isCreatorGET(postId) {

    const response = await fetch(`/iscreator/${postId}`, {
        method: "GET",
    });
    return await response.json();

}

async function postEditPOST(postId, newText) {

    // https://docs.djangoproject.com/en/3.2/ref/csrf/
    let csrftoken = getCookie('csrftoken');

    const response = await fetch(`/postedit/${postId}`, {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
        body: JSON.stringify({
            newText: newText,
        })
    });
    return await response.json();

}

async function newPOST(postText) {

    // https://docs.djangoproject.com/en/3.2/ref/csrf/
    let csrftoken = getCookie('csrftoken');

    const response = await fetch("/newpost", {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
        body: JSON.stringify({
            postText: postText,
        })
    });
    return await response.json();

}

async function isFollowingGET(username) {

    const response = await fetch(`/isfollowing/${username}`, {
        method: "GET",
    });
    return await response.json();

}

async function countFollowingGET(username) {
    const response = await fetch(`/countfollowing/${username}`, {
        method: "GET",
    });
    return await response.json();
}

async function countFollowersGET(username) {
    const response = await fetch(`/countfollowers/${username}`, {
        method: "GET",
    });
    return await response.json();
}

async function followPOST(username) {

    let csrftoken = getCookie('csrftoken');

    const response = await fetch(`/follow/${username}`, {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
    });
    return await response.json();

}

async function unfollowPOST(username) {

    let csrftoken = getCookie('csrftoken');

    const response = await fetch(`/unfollow/${username}`, {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
    });
    return await response.json();

}

async function countLikesGET(postId) {
    const response = await fetch(`/countlikes/${postId}`, {
        method: "GET",
    });
    return await response.json();
}

async function isLikedGET(postId) {
    const response = await fetch(`/isliked/${postId}`, {
        method: "GET",
        cache: "no-store",
    });
    return await response.json();
}

async function likePOST(postId) {

    let csrftoken = getCookie('csrftoken');

    const response = await fetch(`/like/${postId}`, {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
    });
    return await response.json();
}

async function unlikePOST(postId) {

    let csrftoken = getCookie('csrftoken');

    const response = await fetch(`/unlike/${postId}`, {
        method: "POST",
        headers: { "X-CSRFToken": csrftoken },
    });
    return await response.json();
}