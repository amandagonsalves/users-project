const characters = [
    {
        name: 'Jonathan',
        imgProfile: '/img/user1-128x128.jpg'
    },
    {
        name: 'Maria',
        imgProfile: '/img/user4-128x128.jpg'
    },
    {
        name: 'Lucas',
        imgProfile: '/img/user6-128x128.jpg'
    }
]
function renderCard(character) {
    let pub = document.querySelector('.activity-pub');
    let div = document.createElement('div');
    div.innerHTML = `
        <div id="activity-users">
            <div id="profile-head">
                <img src="${character.imgProfile}" class="img-circle"/>
                <p>${character.name}</p>
            </div>
            <p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>
            <div id="icons-activity">
                <i class="fa fa-share"></i>
                <i class="fa fa-like"></i>
                <i class="fa fa-comment"></i>
            </div>
            <input type="text" placeholder="Adicione um comentário"/>
        </div>
    `
    pub.appendChild(div);
}
characters.forEach(character => {
    renderCard(character);
}); 
document.querySelector('.btn-follow').addEventListener('click', e => {
    console.log('ola')
})