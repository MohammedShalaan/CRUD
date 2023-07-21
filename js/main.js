
let siteName = document.getElementById("siteName")
let siteUrl = document.getElementById("siteUrl")
let submit = document.getElementById("submit")
let allWebsite;


submit.setAttribute("data-bs-toggle", "modal")
submit.setAttribute("data-bs-target", "#staticBackdrop")


if (localStorage.getItem('data')) {
    allWebsite = JSON.parse(localStorage.getItem('data'))
    console.log(localStorage.getItem('data'))
    displaydata(allWebsite)
    console.log("we found data")
}
else {
    console.log("no data")
    allWebsite = []
}



submit.addEventListener("click", function () {

    if (validationRuleName() && validationRuleUrl()) {
        let OneLine = {
            siteName: siteName.value,
            siteUrl: siteUrl.value,
        }

        allWebsite.push(OneLine)
        localStorage.setItem('data', JSON.stringify(allWebsite))

        siteName.value = ""
        siteUrl.value = ""
        siteUrl.classList.remove("is-valid")
        siteName.classList.remove("is-valid")

        displaydata(allWebsite)
    }
})


function displaydata(list) {

    let cartona = ``;
    for (let i = 0; i < list.length; i++) {

        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].siteName} </td>
            <td><a href="https://${list[i].siteUrl}/" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit </button></a></td>
            <td> <button class="btn btn-danger" onclick="deletedItem(${i})"> <i class="fa-solid fa-trash-can"></i> Delete </button>
            </td>
        </tr>
                `
    }
    console.log(cartona)
    document.getElementById('tabeladder').innerHTML = cartona

}

function deletedItem(i) {
    allWebsite.splice(i, 1)
    console.log(allWebsite)
    displaydata(allWebsite)
    localStorage.setItem('data', JSON.stringify(allWebsite))

}

siteName.addEventListener("input", function () {
    validationRuleName()
})
siteUrl.addEventListener("input", function () {
    validationRuleUrl()
})

function validationRuleName() {
    let regexName = /^[A-z]{3}[A-z]*$/
    let alertSiteName = document.getElementById("alertSiteName")

    if (regexName.test(siteName.value)) {
        alertSiteName.classList.replace('d-block', "d-none")
        siteName.classList.remove("is-invalid")
        siteName.classList.add("is-valid")
        console.log("yes site name")


        submit.removeAttribute("data-bs-toggle")
        submit.removeAttribute("data-bs-target")
        return true

    } else {
        console.log("no site name");
        alertSiteName.classList.replace("d-none", 'd-block')
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")

        submit.setAttribute("data-bs-toggle", "modal")
        submit.setAttribute("data-bs-target", "#staticBackdrop")

        return false
    }
}
function validationRuleUrl() {
    let regexUrl = /^(www)[.][A-z]+[.](com)$/
    let alertSiteUrl = document.getElementById("alertSiteUrl")

    if (regexUrl.test(siteUrl.value)) {
        console.log("yes site url")
        alertSiteUrl.classList.replace('d-block', "d-none")
        siteUrl.classList.remove("is-invalid")
        siteUrl.classList.add("is-valid")

        submit.removeAttribute("data-bs-toggle")
        submit.removeAttribute("data-bs-target")
        return true
    } else {
        console.log("no site url")
        alertSiteUrl.classList.replace("d-none", 'd-block')
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")

        submit.setAttribute("data-bs-toggle", "modal")
        submit.setAttribute("data-bs-target", "#staticBackdrop")
        return false
    }
}


