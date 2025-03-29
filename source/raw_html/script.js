// Get post from URL like ?post=post1
const params = new URLSearchParams(window.location.search);
const postName = params.get("post") || "post1"; // default post

fetch(`posts/${postName}.md`)
  .then(res => {
    if (!res.ok) throw new Error("Post not found");
    return res.text();
  })
  .then(md => {
    const html = marked.parse(md);
    document.getElementById("post-content").innerHTML = html;
    document.getElementById("post-title").textContent = postName.replace(/-/g, " ");
  })
  .catch(err => {
    document.getElementById("post-content").innerHTML = "<p>Couldn't find that entry in the void.</p>";
  });
