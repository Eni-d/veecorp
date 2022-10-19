let logout = document.querySelector("#logout")
let reviewForm = document.querySelector("#reviewForm")
let addReviewBtn = document.querySelector("#addReviewBtn")
let reviews = document.querySelector("#reviews")
let reviewField = document.querySelector("#review")
let success = document.querySelector("#success")
let submit = document.querySelector("#submit")

fetch(`/getReviews/${localStorage.getItem("company")}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        data.reviews.forEach(review => {
            let content = `
                <!-- Review -->
                <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
                    <p class="font-bold text-sky-700"><i class="la la-user text-4xl"></i> ${review.username}</p>
                    <p class="font-medium mt-5">${review.review}</p>
                </div>
            `
            reviews.innerHTML += content
        });
    })
    .catch((err) => {
        console.log(err)
    })

submit.addEventListener("click", (e) => {
    e.preventDefault()
    let data = {
        company: localStorage.getItem("company"),
        username: localStorage.getItem("username"),
        review: reviewField.value
    }
    fetch('/addReview', {
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
        success.classList.toggle("hidden")
        success.innerText = `Submitted!`
        setTimeout(() => {
            success.classList.toggle("hidden")
        }, 5000)
    })
    .catch((err) => {
        console.log(err)
    })
    reviewField.value = ""
})

addReviewBtn.addEventListener("click", (e) => {
    reviewForm.classList.toggle("hidden")
})

//Log out user
logout.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = "/"
})

// for (let i = 0; i < 20; i++) {
//     let data = {
//         company: faker.company.companyName(),
//         industry: faker.commerce.department(),
//         country: faker.address.country()
//     }
//     fetch('/createCompany', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json',
//             'Accept': 'application/json, text/plain, */*'
//         },
//         body: JSON.stringify(data)
//     })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
