class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
            let values = this.getValuesSettings();
            if (!values) return false;
            let btn = this.formSettings.querySelector('[type=submit]');
            btn.disabled = false;
            this.getPhoto(this.formSettings).then(content => {
                values.photo = content;
                this.addSettings(values);
                btn.disabled = true;
                this.formSettings.reset();
            },
            e => {
                console.log(e);
            }
            );
        });
    }
    addSettings(dataUser) {
        let li = document.querySelector('#nameSettings');
        li.innerHTML = `
            <p>${dataUser.name}</p>
        `
        console.log(JSON.stringify(li.dataset.profile))
    } 
    getPhoto() {
        return new Promise((resolve,reject) => {
            let fileReader = new FileReader();
            let elements = [...this.formSettings.elements].filter(item => {
                if(item.name == 'photo') {
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
            if(file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('/img/boxed-bg.jpg')
            }
        })
    }
    getValuesSettings() {
        let profile = {};
        let isValid = true;
        [...this.formSettings.elements].forEach((field,index) => {
            if (['nameAbout', 'emailAbout', 'experienceAbout'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false
            }
            if(field.name === 'agree') {
                profile[field.name] = field.checked;
                if(field.checked === false) {
                    isValid = false;
                    return false;
                }
            } else {
                profile[field] = field.value;
            }
        });
        if(!isValid) {
            return false;
        }
        return new Profile(
            profile.name,
            profile.email,
            profile.experience
        );
    }
}
