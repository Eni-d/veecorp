let btn = document.querySelector("#btn"),
    password = document.querySelector("#password")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    let data = {
        password: password.value
    }
    fetch('/createUser', {
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
        localStorage.setItem("username", data.user.username)
        localStorage.setItem("password", data.user.password)
        window.location.href = "/dashboard"
    })
    .catch((err) => {
        console.log(err)
    })
})
