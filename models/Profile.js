class Profile {
    constructor(name, email, experience, photo, agree) {
        this._name = name;
        this._email = email;
        this._experience = experience;
        this._photo = photo;
        this._agree = agree;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get experience() {
        return this._experience;
    }
    set experience(value) {
        this._experience = value;
    }
    get photo() {
        return this._photo;
    }
    set photo(value) {
        this._photo = value;
    }
    get agree() {
        return this._agree;
    }
    set agree(value) {
        this._agree = value;
    }
    static getUsersStorage() {
        let profile = {};
        if(localStorage.getItem('users')) {
            profile = JSON.parse(localStorage.getItem('profile'))
        }
        return profile;
    }
}