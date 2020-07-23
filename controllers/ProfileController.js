class ProfileController {
    constructor(formIdCreate, formIdUpdate) {
        this.showMenu();
        this.showPanel();
        this.showCardsActivity();
        this.onSubmitProfile();
        this.renderComment();
        this.selectProfile();

        this.formSettings = document.querySelector(formIdCreate);
        this.formUpdateSettings = document.querySelector(formIdUpdate);

        this.activityPanel = document.querySelector('.activity-pub');
        this.tmlPanel = document.querySelector('.timeline-pub');
        this.settingsPanelSuccess = document.querySelector('.settings-pub.success');
        this.settingsPanelUpdate = document.querySelector('.settings-pub.update');
    }
    onEditProfile() {
        let form = document.querySelector('#form-user-settings-update')
        let btn = form.querySelector('[type=submit]');
        btn.disabled = true;
        let values = this.getValuesSettings(form);
        let profileOld = JSON.parse(form.dataset.userProfile);
        let result = Object.assign({}, profileOld, values);
        this.getPhoto(form).then(
            content => {
                if (!values.photo) {
                    result._photo = profileOld._photo;
                } else {
                    result._photo = content;
                }
                let profile = new Profile();
                profile.loadFromJSON(result);
                this.insert(result);
                this.updateProfile(result);
                this.addEvents(result);
                btn.disabled = false;
                this.editedProfile();
                setTimeout(() => {
                    document.querySelector('#editedProfile').style.display = 'none';
                    this.activity();
                }, 2000)
            },
            e => {
                console.error(e);
            }
        );
    }
    profileCreated() {
        document.querySelector('#editedProfile').style.display = 'block';
        document.querySelector('#editedProfile').innerHTML = `
            <div id="editedProfileConfig">
                <img src="/img/check.svg"/>
                <h1>Perfil criado</h1>
            </div>
        `
    }
    editedProfile() {
        document.querySelector('#editedProfile').style.display = 'block';
        document.querySelector('#editedProfile').innerHTML = `
            <div id="editedProfileConfig">
                <img src="/img/check.svg"/>
                <h1>Perfil atualizado</h1>
            </div>
        `
    }
    deleteProfile() {
        let btnDelete = document.querySelector('.btn-delete');
        btnDelete.addEventListener('click', e => {
            if (confirm('Deseja realmente excluir sua conta?')) {
                localStorage.clear();
                window.location.reload();
            }
        })
    }
    addEvents(dataUser) {
        document.querySelector('#settings').addEventListener('click', e => {
            let form = document.querySelector('#form-user-settings-update')
            form.dataset.userProfile = JSON.stringify(dataUser);
            let json = JSON.parse(form.dataset.userProfile);
            for (let name in json) {
                let field = form.querySelector('[name=' + name.replace('_', '') + ']');
                if (field) {
                    switch (field.type) {
                        case 'file':
                            continue;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                    }
                }
            }
            form.querySelector('.photo').src = json._photo;
            this.showPanelUpdate();
            form.addEventListener('submit', e => {
                e.preventDefault();
                this.onEditProfile();
            })
        });
        document.querySelector('.btn-cancel').addEventListener('click', e => {
            this.activity();
        });
        this.deleteProfile();
    }
    showCardsActivity() {
        let characters = [
            {
                id: 1,
                name: 'Jonathan',
                imgProfile: '/img/user1-128x128.jpg'
            },
            {
                id: 2,
                name: 'Maria',
                imgProfile: '/img/user4-128x128.jpg'
            },
            {
                id: 3,
                name: 'Lucas',
                imgProfile: '/img/user6-128x128.jpg'
            }
        ];
        characters.forEach(character => {
            this.renderCardActivity(character);
        });
    }
    renderComment() {
        let inputs = document.querySelectorAll('.inputComment');
        for (let item of inputs) {
            item.addEventListener('keyup', e => {
                if (e.key === 'Enter') {
                    let comment = e.target;
                    let div = comment.parentNode;
                    let input = div.querySelector('input');
                    let ul = div.querySelector('ul');
                    let id = input.id;
                    if (id > 0) {
                        let li = document.createElement('li');
                            li.innerHTML = `
                            <div id="align-comment">
                                <div id="align-p">
                                    <b>Você comentou</b> 
                                    <div class="icons-comments">
                                        <i class="fa fa-heart" id="comment-like"></i>
                                        <i class="fa fa-trash" id="delete-comment"></i>
                                    </div>
                                </div>
                                <p>${e.target.value}</p>
                            <div>
                            `
                            ul.appendChild(li)
                            e.target.value = '';
                            let allComments = ul.querySelectorAll('li');
                            for (let comment of allComments) {
                                comment.querySelector('#delete-comment').addEventListener('click', e => {
                                    comment.remove();
                                });
                            }
                        

                    }
                }
            })
        }

    }
    renderCardActivity(character) {
        let pub = document.querySelector('.activity-pub');
        let div = document.createElement('div');
        div.innerHTML = `
        <div id="activity-users">
            <div id="profile-head">
                <img src="${character.imgProfile}" class="img-circle"/>
                <p>${character.name}</p>
            </div>
            <div id="text-activity-card">
            <p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>
            </div>
            <div id="icons-activity">
                <i class="fa fa-share"></i>
                <i class="fa fa-like"></i>
                <i class="fa fa-comment"></i>
            </div>
            <ul class="renderComments"></ul>
            <input type="text" placeholder="Adicione um comentário" class="inputComment" id="${character.id}"/>
        </div>
    `
        pub.appendChild(div);
    }
    activity() {
        this.activityPanel.style.display = 'block'
        this.tmlPanel.style.display = 'none';
        this.settingsPanelSuccess.style.display = 'none';
        this.settingsPanelUpdate.style.display = 'none';
    }
    showPanelUpdate() {
        this.activityPanel.style.display = 'none'
        this.tmlPanel.style.display = 'none';
        this.settingsPanelSuccess.style.display = 'none';
        this.settingsPanelUpdate.style.display = 'block';
    }
    button(idButton) {
        return document.getElementById(idButton);
    }
    showPanel() {
        this.showPanelActivity();
        this.showPanelSettingsCreate();
        this.showPanelSettingsUpdate();
        this.showPanelTimeline()
    }
    showPanelActivity() {
        this.button('activity').addEventListener('click', e => {
            this.activity();
        });
    }
    showPanelTimeline() {
        this.button('timeline').addEventListener('click', e => {
            this.activityPanel.style.display = 'none'
            this.tmlPanel.style.display = 'block';
            this.settingsPanelSuccess.style.display = 'none';
            this.settingsPanelUpdate.style.display = 'none';
        });
    }
    showPanelSettingsUpdate() {
        this.button('settings').addEventListener('click', e => {
            this.activityPanel.style.display = 'none'
            this.tmlPanel.style.display = 'none';
            this.settingsPanelSuccess.style.display = 'none';
            this.settingsPanelUpdate.style.display = 'block';
        });
    }
    showPanelSettingsCreate() {
        this.button('btn-register').addEventListener('click', e => {
            this.activityPanel.style.display = 'none'
            this.tmlPanel.style.display = 'none';
            this.settingsPanelSuccess.style.display = 'block';
            this.settingsPanelUpdate.style.display = 'none';
        });
    }
    showMenu() {
        let backdrop = document.querySelector('.backdrop');
        let menu = document.querySelector('.menu');
        let icon = document.querySelector('.icon-menu');
        icon.addEventListener('click', e => {
            menu.classList.add('open');
            backdrop.classList.add('open');
        })
        backdrop.addEventListener('click', e => {
            menu.classList.remove('open');
            backdrop.classList.remove('open');
        })
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
            let values = this.getValuesSettings(this.formSettings);
            if (!values) return false;
            let btn = this.formSettings.querySelector('[type=submit]');
            btn.disabled = true;
            this.getPhoto(this.formSettings).then(content => {
                values.photo = content;
                btn.disabled = false;
                this.formSettings.reset();
                this.profileCreated();
                console.log(window.location.search)
                setTimeout(() => {
                    document.querySelector('#editedProfile').style.display = 'none';
                    this.activity();
                    this.addSettings(values);
                    this.createProfile(values);
                }, 2000);
            },
                e => {
                    console.log(e);
                }
            );
        });
    }
    insert(data) {
        localStorage.setItem('profile', JSON.stringify(data));
    }
    selectProfile() {
        if (localStorage.getItem('profile')) {
            let profile = JSON.parse(localStorage.getItem('profile'))
            this.addSettings(profile)
            this.updateProfile(profile);

        }
    }
    updateProfile(dataUser) {
        let div = document.querySelector('.profile');
        div.innerHTML = `
        <div class="contentProfile">
            <ul class="listProfile">
                <li id="nameSettings">
                    <img src="${dataUser._photo}" alt="" class="profileImg">
                    <p>${dataUser._name}</p>
                </li>
                <ul class="listInfo">
                    <div class="n-followers">
                        <li>Seguidores</li>
                        <li id="numberFollowers">0</li>
                    </div>
                    <hr>
                    <div class="n-following">
                        <li>Seguindo</li>
                        <li id="numberFollowing">0</li>
                    </div>
                    <hr>
                    <div class="n-friends">
                        <li>Amigos</li>
                        <li id="numberFriends">0</li>
                    </div>
                </ul>
            </ul>
            <div class="about">
                <h1>Sobre mim</h1>
                <ul class="aboutMe">
                    <li>
                        <h4>Contato</h4>
                        <p>${(dataUser._email) ? (dataUser._email) : 'Nenhum adicionado'}</p>
                    </li>
                    <hr/>
                    <li>
                        <h4>Experiência</h4>
                        <p>${(dataUser._experience) ? (dataUser._experience) : 'Nenhuma adicionada'}</p>
                    </li>
                </ul>
            </div>
        </div>
        `;
    }
    createProfile(dataUser) {
        let div = document.querySelector('.profile');
        div.innerHTML = `
        <div class="contentProfile">
            <ul class="listProfile">
                <li id="nameSettings">
                    <img src="${dataUser.photo}" alt="" class="profileImg">
                    <p>${dataUser.name}</p>
                </li>
                <ul class="listInfo">
                    <div class="n-followers">
                        <li>Seguidores</li>
                        <li id="numberFollowers">0</li>
                    </div>
                    <hr>
                    <div class="n-following">
                        <li>Seguindo</li>
                        <li id="numberFollowing">0</li>
                    </div>
                    <hr>
                    <div class="n-friends">
                        <li>Amigos</li>
                        <li id="numberFriends">0</li>
                    </div>
                </ul>
            </ul>
            <div class="about">
                <h1>Sobre mim</h1>
                <ul class="aboutMe">
                    <li>
                        <h4>Contato</h4>
                        <p>${(dataUser.email) ? (dataUser.email) : 'Nenhum adicionado'}</p>
                    </li>
                    <hr/>
                    <li>
                        <h4>Experiência</h4>
                        <p>${(dataUser.experience) ? (dataUser.experience) : 'Nenhuma adicionada'}</p>
                    </li>
                </ul>
            </div>
        </div>
        `;
    }
    addSettings(dataUser) {
        this.insert(dataUser);
        let timeline = document.querySelector('.timeline-pub');
        timeline.innerHTML = `
                    <div class="email">
                        <div class="email-head">
                            <p>
                                <span style='color: blue; font-weight:700'>Support Team</span>
                                enviou um email</p>
                            <p>12:15</p>
                        </div>
                        <p id="email-text">Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...</p>
                        <div class="buttons">
                            <button id="btn-readMore">Ler mais</button>
                            <button id="btn-deleteEmail">Excluir</button>
                        </div>
                    </div>
                    <div class="request">
                        <img src="img/user6-128x128.jpg" alt="user image">
                        <p>Lucas aceitou sua solicitação de amizade.</p>
                    </div>
                    <div class="comment">
                        <div id="comment-head">
                            <p>
                                <span style='color: blue; font-weight:700'>Jay White</span>
                                comentou na sua publicação</p>
                            <p>27 minutos atrás</p>
                        </div>
                        <p id="comment-content">Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!</p>
                        <button id="tml-comment">Ver comentário</button>
                    </div>
        `;

        let formUpdate = document.querySelector('.settings-pub.update');
        formUpdate.innerHTML = `
        <form action="" id="form-user-settings-update">
            <div class="formUpdateAboutMe">
                <h1>Editar perfil</h1>
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder="Nome">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="experience">Experiência</label>
                    <input type="text" name="experience" id="experience" placeholder="Experiência">
                </div>
                <div class="form-group">
                    <img src="/img/boxed-bg.jpg" alt="" class="photo" style="width:200px; height: 200px; margin-bottom:10px;">
                    <input type="file" name="photo" id="photo">
                </div>
                <div class="form-group">
                    <label for="password">Redefinir senha</label>
                    <input type="password" name="password" id="password">
                </div>
                <input type="checkbox" name="agree" id="agree">
                <label for="agree">Eu concordo com os <b>termos e condições</b></label>
                <div class="form-group buttonsUpdate">
                    <button type="submit" id="btn-updateAboutMe">Enviar</button>
                    <div id="buttonsUpdate">
                        <button type="button" class="btn-cancel">Cancelar</button>
                        <button type="button" class="btn-delete">Excluir conta</button>
                    </div>
                </div>
            </div>
        </form>
        `;
        this.addEvents(dataUser);
    }
    getPhoto(formEl) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let elements = [...formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });
            let file = elements[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('/img/boxed-bg.jpg')
            }
        })
    }
    getValuesSettings(formEl) {
        let profile = {};
        let isValid = true;
        [...formEl.elements].forEach((field, index) => {
            if (['name', 'email', 'experience', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
            if (field.name === 'agree') {
                profile[field.name] = field.checked;
                if (field.checked === false) {
                    isValid = false;
                }
            } else {
                profile[field.name] = field.value;
            }
        });
        if (!isValid) {
            return false;
        }
        return new Profile(
            profile.name,
            profile.email,
            profile.experience,
            profile.photo,
            profile.password,
            profile.agree
        );
    }
}
