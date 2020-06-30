let userController = new UserController('form-user-create', 'table-users');
function countries() {
    countrySelect = document.querySelector('#selectCountry');
    fetch("https://restcountries.eu/rest/v2/all")
    .then(
        res => res.json())
    .then(states => {
        for(const state of states) {
            countrySelect.innerHTML += `
            <option value="${state.alpha2Code}">${state.name}</option>
            `
        }
    });
}
countries();
document.querySelector('.icon-menu').addEventListener('click', e => {
    document.querySelector('.menu').classList.add('open');
    document.querySelector('.backdrop').classList.add('open');
})
document.querySelector('.backdrop').addEventListener('click', e => {
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.backdrop').classList.remove('open');
})