class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
            let btn = this.formSettings.querySelector('[type=submit]');
            btn.disabled = true;
            this.getValuesSettings();
        });
    }
    getValuesSettings() {
        let profile = {};
        let isValid = true;
        [...this.formSettings.elements].forEach((field,index) => {
            if (['nameAbout', 'emailAbout', 'experienceAbout'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false
            } else if(field.name === 'agree') {
                profile[field.name] = field.checked;
                if(field.checked === false) {
                    isValid = false;
                    return false;
                } else {
                    isValid = true;
                }
            } else {
                profile[field] = field.value;
                console.log(profile[field])
            }
        });
        if(!isValid) {
            btn.disabled = true;
            return false;
        }
        return new Profile(
            profile.name,
            profile.email,
            profile.experience
        );
    }
}
