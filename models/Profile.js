class Profile {
    constructor(name, email, experience) {
        this._name = name;
        this._email = email;
        this._experience = experience;
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
}