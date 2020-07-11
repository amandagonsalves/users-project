let profileController = new ProfileController();
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
function showPanel() {

    let btnActivity = document.querySelector('#activity');
    let btnTimeline = document.querySelector('#timeline');
    let btnSettings = document.querySelector('#settings');
    let btnRegister = document.querySelector('#btn-register');

    let activityPanel = document.querySelector('.activity-pub');
    let tmlPanel = document.querySelector('.timeline-pub');
    let settingsPanel = document.querySelector('.settings-pub');

    btnActivity.addEventListener('click', e => {
        activityPanel.style.display = 'block'
        tmlPanel.style.display = 'none';
        settingsPanel.style.display = 'none';
    })
    btnTimeline.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'block';
        document.querySelector('.settings-pub').style.display = 'none';
    })
    btnSettings.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'none';
        settingsPanel.style.display = 'block';
    })
    btnRegister.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'none';
        settingsPanel.style.display = 'block';
    })
}
showPanel();
document.querySelector('.icon-menu').addEventListener('click', e => {
    document.querySelector('.menu').classList.add('open');
    document.querySelector('.backdrop').classList.add('open');
})
document.querySelector('.backdrop').addEventListener('click', e => {
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.backdrop').classList.remove('open');
})
