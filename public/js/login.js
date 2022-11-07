let btn = document.querySelector("#btn"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    error = document.querySelector("#error")

error.style.display = "none"

btn.addEventListener("click", (e) => {
    e.preventDefault()
    let data = {
        email: email.value,
        password: password.value
    }
    fetch('/getUser', {
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
        if (data.user == null) {
            error.style.display = "flex"
            error.innerText = `Oops! No such user. Please make sure your details are correct.`
            setTimeout(() => {
                error.style.display = "none"
            }, 10000)
        } else {
            localStorage.setItem("username", data.user.username)
            localStorage.setItem("password", data.user.password)
            window.location.href = "/dashboard"
        }
    })
    .catch((err) => {
        console.log(err)
    })
})