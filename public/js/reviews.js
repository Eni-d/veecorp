let logout = document.querySelector("#logout")
let reviewForm = document.querySelector("#reviewForm")
let addReviewBtn = document.querySelector("#addReviewBtn")
let reviews = document.querySelector("#reviews")
let reviewField = document.querySelector("#review")
let success = document.querySelector("#success")
let submit = document.querySelector("#submit")

//Fields to pull data from review form
let workingHours = document.querySelector("#workingHours")
let compensation = document.querySelector("#compensation")
let personnelDevelopment = document.querySelector("#personnelDevelopment")
let workingAtmosphere = document.querySelector("#workingAtmosphere")
let leadershipAndManagement = document.querySelector("#leadershipAndManagement")
let workingActivity = document.querySelector("#workingActivity")


fetch(`/getReviews/${localStorage.getItem("company")}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        data.reviews.forEach(review => {
            // let content = `
            //     <!-- Review -->
            //     <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
            //         <p class="font-bold text-sky-700"><i class="la la-user text-4xl"></i> ${review.username}</p>
            //         <p class="font-medium mt-5">${review.review}</p>
            //     </div>
            // `
            let content = `
                <!-- Review -->
                <div class="bg-white shadow-xl rounded-md p-5 w-80 md:w-96 mb-6">
                    <p class="font-bold text-sky-700"><i class="la la-user text-4xl mb-5"></i> ${review.username}</p>
                    <div class="mb-5">
                        <h1 class="font-bold">Working Hours</h1>
                        <p>${review.workingHours}</p>
                    </div>
                    <div class="mb-5">
                        <h1 class="font-bold">Compensation</h1>
                        <p>${review.compensation}</p>
                    </div>
                    <div class="mb-5">
                        <h1 class="font-bold">Personnel Development</h1>
                        <p>${review.personnelDevelopment}</p>
                    </div>
                    <div class="mb-5">
                        <h1 class="font-bold">Working Atmosphere</h1>
                        <p>${review.workingAtmosphere}</p>
                    </div>
                    <div class="mb-5">
                        <h1 class="font-bold">Leadership And Management</h1>
                        <p>${review.leadershipAndManagement}</p>
                    </div>
                    <div class="mb-5">
                        <h1 class="font-bold">Working Activity</h1>
                        <p>${review.workingActivity}</p>
                    </div>
                </div>
            `
            reviews.innerHTML += content
        });
    })
    .catch((err) => {
        console.log(err)
    })

//Submit Review    
submit.addEventListener("click", (e) => {
    e.preventDefault()
    // let data = {
    //     company: localStorage.getItem("company"),
    //     username: localStorage.getItem("username"),
    //     review: reviewField.value
    // }
    let data = {
        company: localStorage.getItem("company"),
        username: localStorage.getItem("username"),
        workingHours: workingHours.value,
        compensation: compensation.value,
        personnelDevelopment: personnelDevelopment.value,
        workingAtmosphere: workingAtmosphere.value,
        leadershipAndManagement: leadershipAndManagement.value,
        workingActivity: workingActivity.value
    }
    console.log(data)

    workingHours = ""
    compensation = ""
    personnelDevelopment = ""
    workingAtmosphere = ""
    leadershipAndManagement = ""
    workingActivity = ""

    success.classList.toggle("hidden")
    success.innerText = `Submitted!`
    setTimeout(() => {
        success.classList.toggle("hidden")
    }, 5000)
    
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
        // success.classList.toggle("hidden")
        // success.innerText = `Submitted!`
        // setTimeout(() => {
        //     success.classList.toggle("hidden")
        // }, 5000)
        setTimeout(() => {
            reviewForm.classList.toggle("hidden")
        }, 1000)
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
