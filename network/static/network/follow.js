function showFollow(requestedUsername, followButtonId, countContainerId) {

    isFollowingGET(requestedUsername).then(isfollowing => {
        // If following user
        if(isfollowing.isfollowing) {
            document.querySelector(followButtonId).innerHTML = "Unfollow";
            document.querySelector(followButtonId).className = "btn btn-sm btn-secondary";
            document.querySelector(followButtonId).onclick = () => unfollow(requestedUsername, followButtonId, countContainerId);
        // If not following user
        } else {
            document.querySelector(followButtonId).innerHTML = "Follow";
            document.querySelector(followButtonId).className = "btn btn-sm btn-primary";
            document.querySelector(followButtonId).onclick = () => follow(requestedUsername, followButtonId, countContainerId);
        }
    });

}

function unfollow(requestedUsername, followButtonId, countContainerId) {

    unfollowPOST(requestedUsername).then(isfollowing => {
        if(!isfollowing.isfollowing) {
            document.querySelector(followButtonId).innerHTML = "Follow";
            document.querySelector(followButtonId).className = "btn btn-sm btn-primary";
            document.querySelector(followButtonId).onclick = () => follow(requestedUsername, followButtonId, countContainerId);
            loadCounts(requestedUsername, countContainerId);
        }
    });
    
}

function follow(requestedUsername, followButtonId, countContainerId) {

    followPOST(requestedUsername).then(isfollowing => {
        if(isfollowing.isfollowing) {
            document.querySelector(followButtonId).innerHTML = "Unfollow";
            document.querySelector(followButtonId).className = "btn btn-sm btn-secondary";
            document.querySelector(followButtonId).onclick = () => unfollow(requestedUsername, followButtonId, countContainerId);
            loadCounts(requestedUsername, countContainerId);
        }
    });

}