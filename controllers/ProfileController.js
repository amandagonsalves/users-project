class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
        
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
            this.getValuesSettings();
            this.formSettings.reset();
        });
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
                return false;
            }
        })
    }
    getValuesSettings() {
        let profile = {};
        let isValid = true;
        let btn = this.formSettings.querySelector('[type=submit]');
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
                console.log(field.value);
            }
        });
        if(!isValid) {
            btn.disabled = true;
            return false;
        } else {
            btn.disabled = false;
        }
        return new Profile(
            profile.name,
            profile.email,
            profile.experience
        );
    }
}
