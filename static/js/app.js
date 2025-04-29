let username = localStorage.getItem("username");
if (!username) {
    window.location.href = "/login.html";
}

function renderPost(post, isNew = false) {
    const template = document.getElementById("post-template").content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;

    const feed = document.getElementById("feed");
    if (isNew) {
        feed.prepend(template);
    } else {
        feed.appendChild(template);
    }
}
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

async function submitPost() {
    const message = document.getElementById("postInput").value;
    
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                message: message,
            }),
        });

        if (response.ok) {
            renderPost({username: username, message: message}, true);
            document.getElementById("postInput").value = ""; // Clear the input field
        } else {
            console.error("Failed to submit post. Server responded with status:", response.status);
        }

    } catch (error) {
        console.error("Error submitting post", error);
    }
}

window.onload = async () => {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        posts.forEach(post => renderPost(post));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};
