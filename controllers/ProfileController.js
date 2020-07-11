class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
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
                btn.disabled = true;    
                this.formSettings.reset();
                this.showPanelActivity();

            },
                e => {
                    console.log(e);
                }
            );
        }); 
    }
    showPanelActivity() {
        let activityPanel = document.querySelector('.activity-pub');
        activityPanel.style.display = 'block';
        this.formSettings.style.opacity = '1';
    }
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
                        <p>${dataUser.email}.</p>
                    </li>
                    <hr/>
                    <li>
                        <h4>Experiência</h4>
                        <p>${dataUser.experience}.</p>
                    </li>
                </ul>
            </div>
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
            if (field.name === 'agree') {
                profile[field.name] = field.checked;
                if (field.checked === false) {
                    isValid = false;
                }
            } else {
                profile[field.name] = field.value;
            }
        });
        console.log(`user = ${JSON.stringify(profile)}`)
        if (!isValid) {
            return false;
        }
        return new Profile(
            profile.name,
            profile.email,
            profile.experience,
            profile.photo,
            profile.agree
        );
    }
}
