let user = document.querySelector("#user")
let success = document.querySelector("#success")
let searchBtn = document.querySelector("#searchBtn")
let search = document.querySelector("#search")
let company = document.querySelector("#company")
let companies = document.querySelector("#companies")
let logout = document.querySelector("#logout")

//Search company
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`/getCompany/${search.value}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            console.log(data)
            search.value = ""
            company.classList.toggle("hidden")
            companies.classList.add("hidden")
            let content = `
                <!-- Company -->
                <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
                    <p class="font-bold text-xl text-sky-700">${data.company.company}</p>
                    <p class="font-medium text-md">${data.company.country}</p>
                    <p class="font-medium text-sm mb-5">${data.company.industry}</p>
                    <div class="container mx-auto flex flex-row justify-start items-center space-x-3">
                        <a href="/reviews" class="font-medium hover:cursor-pointer hover:text-sky-900 text-sky-700" id="reviewLink">Reviews</a>
                        <a href="" class="font-medium hover:cursor-pointer hover:text-sky-900 text-sky-700" id="follow">Follow</a>
                    </div>
                </div>
                <button class="bg-sky-700 w-72 text-white p-3 font-medium rounded mt-5 hover:bg-sky-900" id="close">Close</button>
            `
            company.innerHTML = content
            let followLinks = document.querySelectorAll("#follow")
            followLinks.forEach(followLink => {
                fetch(`/getFollow/${localStorage.getItem("username")}[${followLink.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText}`)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data)
                        if (data.follow.length !== 0) {
                            followLink.innerText = "Unfollow"
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                followLink.addEventListener("click", (e) => {
                    e.preventDefault()
                    let data = {
                        company: e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText,
                        username: localStorage.getItem("username")
                    }
                    if (followLink.innerText == "Unfollow") {
                        fetch(`/unfollow/${e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText}`)
                        .then((response) => {
                            return response.json()
                        })
                        .then((data) => {
                            console.log(data)
                            followLink.innerText = "Follow"
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    } else {
                        fetch('/follow', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json, text/plain, */*'
                            },
                            body: JSON.stringify(data)
                        })
                        .then((response) => {
                            return response.json()
                        })
                        .then((data) => {
                            console.log(data)
                            followLink.innerText = "Unfollow"
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                    
                })
            });
            let close = document.querySelector("#close")
            close.addEventListener("click", (e) => {
                e.preventDefault()
                company.classList.toggle("hidden")
                companies.classList.remove("hidden")
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//Display Companies
fetch('/getCompanies')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        data.companies.forEach(company => {
            let content = `
                <!-- Company -->
                <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
                    <p class="font-bold text-xl text-sky-700">${company.company}</p>
                    <p class="font-medium text-md">${company.country}</p>
                    <p class="font-medium text-sm mb-5">${company.industry}</p>
                    <div class="container mx-auto flex flex-row justify-start items-center space-x-3">
                        <a href="/reviews" class="font-medium hover:cursor-pointer hover:text-sky-900 text-sky-700" id="reviewLink">Reviews</a>
                        <a href="" class="font-medium hover:cursor-pointer hover:text-sky-900 text-sky-700" id="follow">Follow</a>
                    </div>
                </div>
            `
            companies.innerHTML += content
        });
        let reviewLinks = document.querySelectorAll("#reviewLink")
        reviewLinks.forEach(reviewLink => {
            reviewLink.addEventListener("click", (e) => {
                e.preventDefault()
                localStorage.setItem("company", e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText)
                localStorage.setItem("country", e.target.parentElement.previousElementSibling.previousElementSibling.innerText)
                localStorage.setItem("industry", e.target.parentElement.previousElementSibling.innerText)
                window.location.href = "/reviews"
            })
        });
        let followLinks = document.querySelectorAll("#follow")
        followLinks.forEach(followLink => {
            fetch(`/getFollow/${localStorage.getItem("username")}[${followLink.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText}`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data)
                    if (data.follow.length !== 0) {
                        followLink.innerText = "Unfollow"
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            followLink.addEventListener("click", (e) => {
                e.preventDefault()
                let data = {
                    company: e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText,
                    username: localStorage.getItem("username")
                }
                if (followLink.innerText == "Unfollow") {
                    fetch(`/unfollow/${e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText}`)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data)
                        followLink.innerText = "Follow"
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    fetch('/follow', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json, text/plain, */*'
                        },
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data)
                        followLink.innerText = "Unfollow"
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                
            })
        });
    })
    .catch((err) => {
        console.log(err)
    })

user.innerText = localStorage.getItem("username")

// success.innerText = `Welcome. Your username is ${localStorage.getItem("username")}. Please do not forget!`
// setTimeout(() => {
//     success.style.display = "none"
// }, 10000)

//Log out user
logout.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = "/"
})
