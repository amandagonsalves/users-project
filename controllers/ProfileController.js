class ProfileController {
    constructor(formIdCreate, formIdUpdate) {
        this.showMenu();
        this.showPanel();
        this.showCardsActivity();
        this.onSubmitProfile();

        this.formSettings = document.querySelector(formIdCreate);
        this.formUpdateSettings = document.querySelector(formIdUpdate);

        this.activityPanel = document.querySelector('.activity-pub');
        this.tmlPanel = document.querySelector('.timeline-pub');
        this.settingsPanelSuccess = document.querySelector('.settings-pub.success');
        this.settingsPanelUpdate = document.querySelector('.settings-pub.update');
    }
    /* onEditProfile() {
        let btn = this.formUpdateSettings.querySelector('[type=submit]');
        btn.disabled = true;
        let values = this.getValuesSettings(this.formUpdateSettings);

    } */
    addEvents(dataUser) {
        document.querySelector('#settings').addEventListener('click', e => {
            let form = document.querySelector('#form-user-settings-update')
            form.dataset.userProfile = JSON.stringify(dataUser);
            let json = JSON.parse(form.dataset.userProfile);
            console.log(json)
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
            /* form.addEventListener('submit', e => {
                e.preventDefault();
                this.onEditProfile();
            }) */
        });
        document.querySelector('.btn-cancel').addEventListener('click', e => {
            this.activity();
        });
        document.querySelector('.btn-delete').addEventListener('click', e => {
            alert('deletar')
        });
    }
    showCardsActivity() {
        let characters = [
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
        ];
        characters.forEach(character => {
            this.renderCardActivity(character);
        });
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
                this.addSettings(values);
                this.formSettings.reset();
                this.activity();
            },
                e => {
                    console.log(e);
                }
            );
        }); 
    }
    addSettings(dataUser) {
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
            if (['name', 'email', 'experience','password'].indexOf(field.name) > -1 && !field.value) {
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
