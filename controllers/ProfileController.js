class ProfileController {
    constructor(formIdCreate, formIdUpdate) {
        this.onSubmitProfile();
        this.formSettings = document.querySelector(formIdCreate);
        this.formUpdateSettings = document.querySelector(formIdUpdate);
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
                /* this.showEditSettings(); */
            },
                e => {
                    console.log(e);
                }
            );
        }); 
    }
    /* onEditProfile() {
        document.querySelector('.btn-edit').addEventListener('click', e => {
            console.log('ola')
            this.showPanelUpdate();
        })
    }  
    showEditPanel() {
       
    }
    showEditSettings() {
        let btnSettings = document.querySelector('#settings');
        btnSettings.addEventListener('click', e => {
            this.showEditPanel();
            console.log('ola')
        })
    }*/
    addSettings(dataUser) {
        let div = document.querySelector('.profile');
        div.dataset.userProfile = JSON.stringify(dataUser);
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
                <div>
                    <button type="button" class="btn btn-primary btn-edit"><i class="fa fa-edit"></i></button>
                    <button type="button" class="btn btn-danger btn-delete"><i class="fa fa-times"></i></button>
                </div>
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
        `
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
        `
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
                Eu concordo com os termos e condições
                <div class="form-group">
                    <button type="submit" id="btn-updateAboutMe">Enviar</button>
                </div>
            </div>
        </form>
        `
        let json = JSON.parse(div.dataset.userProfile);
        for (let name in json) {
            let field = this.formSettings.querySelector('[name=' + name.replace('_', '') + ']');
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
        this.formSettings.querySelector('.photo').src = json._photo;
        console.log(div.dataset.userProfile)
    }
    getPhoto() {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let elements = [...this.formSettings.elements].filter(item => {
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
    getValuesSettings() {
        let profile = {};
        let isValid = true;
        [...this.formSettings.elements].forEach((field, index) => {
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
