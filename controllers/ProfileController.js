class ProfileController {
    constructor() {
        this.onSubmitProfile();
        this.formSettings = document.querySelector('#form-user-settings');
    }
    onSubmitProfile() {
        document.querySelector('#form-user-settings').addEventListener('submit', e => {
            e.preventDefault();
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
            } else if (isValid) {
                profile[field] = field.value;
                console.log(profile[field]);
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
