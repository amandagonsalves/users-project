class UserController {
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }
    onSubmit() {
        this.formEl.addEventListener('submit', e => {
            e.preventDefault();
            console.log('ola')
            this.addLine(this.getValues())
        })
    }
    getValues() {
        let user = {};
        [...this.formEl.elements].forEach((field, index) => {
            if(field.name === 'gender') {
                if(field.checked) {
                    user[field.name] = field.value;
                    console.log(user[field.name] = field.value)
                }
            } else if(field.name === 'admin') {
                user[field.name] = field.checked;
                console.log(user[field.name] = field.checked)
            } else {
                user[field.name] = field.value;
                console.log(user[field.name] = field.value)
            }
        });
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }
    addLine(dataUser) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.tableEl.appendChild(tr); 
    }
}