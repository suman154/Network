function createEditButton(post) {

    let editButton = document.createElement("button");
    editButton.className = "btn btn-sm btn-secondary";
    editButton.innerHTML = "Edit";
    // Add 'onlick' event handler to edit button 
    editButton.onclick = () => editPost(post, editButton);

    return editButton;

}

function createSaveButton(post, postText, postTextarea, editButton) {

    let saveButton = document.createElement("button");
    saveButton.className = "btn btn-sm btn-primary";
    saveButton.innerHTML = "Save";

    // Add 'onlick' event handler to save button 
    saveButton.onclick = () => {
        newText = postTextarea.value;
        postEditPOST(post.id, newText)
        .then(() => {
            // Update post element with new text
            postText.innerHTML = newText;
            // Remove save button 
            saveButton.remove();
            // Show edit button 
            editButton.style.display = "";
        });
    }

    return saveButton;

}

function editPost(post, editButton) {

    // Find post text element
    let postText = document.querySelector(`#PostText${post.id}`);

    // Create textarea element
    let postTextarea = document.createElement('textarea');

    // Add current post text
    postTextarea.innerHTML = postText.innerHTML;

    // Clear post text element
    postText.innerHTML = "";

    // Add textarea to post text element
    postText.append(postTextarea);

    // Hide edit button 
    editButton.style.display = "none";

    // Create save button 
    let saveButton = createSaveButton(post, postText, postTextarea, editButton);

    // Add save button to post body 
    let postBody = document.querySelector(`#PostBody${post.id}`); 
    postBody.append(saveButton);

}