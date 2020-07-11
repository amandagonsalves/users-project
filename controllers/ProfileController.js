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
            btn.disabled = false;
            let div = document.querySelector('.profile');
            div.dataset.userProfile = JSON.stringify(values)
            let userOld = JSON.parse(div.dataset.userProfile);
            let result = Object.assign({}, userOld, values);
            btn.disabled = true;
            this.getPhoto(this.formSettings).then(content => {
                if (!values.photo) {
                    values._photo = userOld._photo;
                } else {
                    values.photo = content;
                }
                this.addSettings(values);
                btn.disabled = true;
                this.formSettings.reset();
                btn.disabled = false;
            },
                e => {
                    console.log(e);
                }
            );
        }); 
    }
    addSettings(dataUser) {
        let div = document.querySelector('.profile');
        div.dataset.userProfile = JSON.stringify(dataUser);
        div.innerHTML = `
        <div class="contentProfile">
        <ul class="listProfile">
            <li id="nameSettings">
                <img src="/img/boxed-bg.jpg" alt="" class="profileImg">
                <p>Nome</p>
            </li>
            <ul class="listInfo">
                <div class="n-followers">
                    <li>Seguidores</li>
                    <li id="numberFollowers">180</li>
                </div>
                <hr>
                <div class="n-following">
                    <li>Seguindo</li>
                    <li id="numberFollowing">176</li>
                </div>
                <hr>
                <div class="n-friends">
                    <li>Amigos</li>
                    <li id="numberFriends">200</li>
                </div>
            </ul>
        </ul>
            <button type="button" class="btn-edit"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn-danger btn-delete"><i class="fa fa-times"></i></button>
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
