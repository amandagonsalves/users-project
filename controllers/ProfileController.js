class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
        this.insert();
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
            let values = this.getValuesSettings(this.formSettings);
            if (!values) return false;
            let btn = this.formSettings.querySelector('[type=submit]');
            btn.disabled = false;
            let li = document.querySelector('#nameSettings');
            li.dataset.profile = JSON.stringify(values)
            let userOld = JSON.parse(li.dataset.profile);
            let result = Object.assign({}, userOld, values);
            btn.disabled = true;
            this.getPhoto(this.formSettings).then(content => {
                if (!values.photo) {
                    result._photo = userOld._photo;
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
    getProfileStorage() {
        let userProfile;
        if(localStorage.getItem('profile')) {
            userProfile = JSON.parse(localStorage.getItem('profile'));
        }
        return userProfile;
    }
    selectProfile() {
        let userProfile = this.getProfileStorage()
        let profile123 = new Profile();
        profile123.loadFromJSON(dataUser);
        this.addSettings(profile123)
        return profile123;
    }  
    insert(data) {
        /* this.selectProfile(); */
        let userProfile = this.getProfileStorage();
        userProfile = data;
        localStorage.setItem('profile', JSON.stringify(userProfile));
    }
    addSettings(dataUser) {
        this.insert(dataUser);
        let li = document.querySelector('#nameSettings');
        li.dataset.profile = JSON.stringify(dataUser);
        li.innerHTML = `
            <img src="${dataUser.photo}" class="profileImg"/>
            <p>${dataUser.name}</p>
        `
        let json = JSON.parse(li.dataset.profile);
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
        console.log(li.dataset.profile)
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
