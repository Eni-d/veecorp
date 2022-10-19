let feeds = document.querySelector("#feeds")
let logout = document.querySelector("#logout")

fetch(`/getFeed/${localStorage.getItem("username")}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        data.follow.forEach(review => {
            let content = `
                <!-- Review -->
                <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
                    <p class="font-bold text-xl text-sky-700">${review.company}</p>
                    <a href="/reviews" class="font-medium hover:cursor-pointer hover:text-sky-900 text-sky-700" id="reviewLink">Reviews</a>
                </div>
            `
            feeds.innerHTML += content
        });
        let reviewLinks = document.querySelectorAll("#reviewLink")
        reviewLinks.forEach(reviewLink => {
            reviewLink.addEventListener("click", (e) => {
                e.preventDefault()
                localStorage.setItem("company", e.target.previousElementSibling.innerText)
                window.location.href = "/reviews"
            })
        });
    })
    .catch((err) => {
        console.log(err)
    })

//Log out user
logout.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = "/"
})