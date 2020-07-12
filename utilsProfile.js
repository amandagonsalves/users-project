let profileController = new ProfileController('#form-user-settings', '#form-user-settings-update');
function showPanel() {

    let btnActivity = document.querySelector('#activity');
    let btnTimeline = document.querySelector('#timeline');
    let btnRegister = document.querySelector('#btn-register');
    let btnSettings = document.querySelector('#settings');

    let activityPanel = document.querySelector('.activity-pub');
    let tmlPanel = document.querySelector('.timeline-pub');
    let settingsPanelSuccess = document.querySelector('.settings-pub.success');
    let settingsPanelUpdate = document.querySelector('.settings-pub.update');

    btnActivity.addEventListener('click', e => {
        activityPanel.style.display = 'block'
        tmlPanel.style.display = 'none';
        settingsPanelSuccess.style.display = 'none';
        settingsPanelUpdate.style.display = 'none';
    });
    btnTimeline.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'block';
        settingsPanelSuccess.style.display = 'none';
        settingsPanelUpdate.style.display = 'none';
    });
    btnSettings.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'none';
        settingsPanelSuccess.style.display = 'none';
        settingsPanelUpdate.style.display = 'block';
    });
    btnRegister.addEventListener('click', e => {
        activityPanel.style.display = 'none'
        tmlPanel.style.display = 'none';
        settingsPanelSuccess.style.display = 'block';
        settingsPanelUpdate.style.display = 'none';
    });
}
showPanel();
document.querySelector('.icon-menu').addEventListener('click', e => {
    document.querySelector('.menu').classList.add('open');
    document.querySelector('.backdrop').classList.add('open');
})
document.querySelector('.backdrop').addEventListener('click', e => {
    document.querySelector('.menu').classList.remove('open');
    document.querySelector('.backdrop').classList.remove('open');
})
