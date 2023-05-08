function clearModal() {
    document.getElementById('name').value = '';
    document.getElementById('time').value = '';
    document.getElementById('type').selectedIndex = 0   ;
    document.getElementById('titlePartOne').innerHTML = 'Új teljesítés';
    document.getElementById('newEditSubmit').dataset.id = '';
    document.getElementById("errors").innerHTML = '';
    document.getElementById("errors").setAttribute('hidden', true)
}

function fillModal(el, mode, id) {
    document.getElementById("errors").innerHTML = '';
    document.getElementById("errors").setAttribute('hidden', true)
    const name = el.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    const time = el.parentElement.parentElement.previousElementSibling.innerHTML;
    document.getElementById('titlePartOne').innerHTML = 'Teljesítés szerkesztése';
    document.getElementById('time').value = time;
    document.getElementById('name').value = name;
    document.getElementById('type').selectedIndex = mode + 1;
    document.getElementById('newEditSubmit').dataset.id = id;
}

function fillDeleteModal(el, effort_id, route_id) {
    const bodyPrefix = "Biztosan törlöd ezt a teljesítést? "
    const bodyPostfix = " Ezt később nem tudod visszavonni!"
    const name = el.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    const time = el.parentElement.parentElement.previousElementSibling.innerHTML;
    document.getElementById('modal-title').innerHTML = "Teljesítés törlése";
    document.getElementById('modal-body').innerHTML = bodyPrefix + ` ${name}, ${time}` + bodyPostfix;
    document.getElementById('deleteSubmit').setAttribute('href', '/routes/' + route_id + '/del-effort/' + effort_id);
}

function onNewEditSubmit(route_id) {
    const id = document.getElementById('newEditSubmit').dataset.id;
    const name = document.getElementById('name').value
    const time = document.getElementById('time').value
    const type = document.getElementById('type').value
    const formData = JSON.stringify({ name, time, type })
    if (id) {
        fetch(`/routes/${route_id}/edit-effort/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors.length !== 0) {
                addErrors(data.errors)
            } else {
                window.location.reload()
            }
        })
    } else {
        fetch(`/routes/new-effort/${route_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors.length !== 0) {
                addErrors(data.errors)
            } else {
                window.location.reload()
            }
        })
    }
}

function addErrors(errors) {
    document.getElementById("errors").innerHTML = ''
    document.getElementById("errors").removeAttribute('hidden')
    errors.forEach(err => {
        const myErr = document.createElement('li')
        myErr.innerHTML = err
        document.getElementById("errors").appendChild(myErr)
    })
}