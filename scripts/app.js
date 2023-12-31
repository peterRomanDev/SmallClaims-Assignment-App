import { pageHome } from './pageHome.js';
import { pageManageUsers } from './pageManageUsers.js';
import { sidebar, showTooltipMsg, hideTooltipMsg, activateBtnToggle, showDarkBg, hideDarkBg, openSidebar, closeSidebar } from './sidebar.js';
import { shrinkDashboard, extendDashboard, enableScrolling, disableScrolling } from './dashboard.js';
import { highlightUserBtn, getUserInput, checkUserInput, showFeedbackNone, showFeedbackSuccess, showFeedbackError, clearUserInput, displayListOfUsers, addUser, deleteUser } from './list-of-users.js';
import { showUserInfo } from './user-window.js';
import { getUsers, getNationalities } from './data.js';
import { storeUser, addStoredUsers, deleteStoredUser } from './user-storage.js';

const app = document.querySelector('.app');

app.addEventListener('click', e => {
    // show/hide sidebar button clicked
    if(e.target.classList.contains('sidebar-btn-toggle')) {
        // if the sidebar is hidden...
        if(sidebar.classList.contains('sidebar-hidden')) {
            // open sidebar
            openSidebar();
        }
        // if the sidebar is visible...
        else {
            // close sidebar
            closeSidebar();
        }
    }
    // dark background clicked
    else if(e.target.classList.contains('bg-dark')) {
        // close sidebar
        closeSidebar();
    }
    else if(e.target.classList.contains('btn-page-home')) {
        // load the page Home
        pageHome();

        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // close sidebar
            closeSidebar();
        }
    }
    else if(e.target.classList.contains('btn-page-manage-users')) {
        // load the page Manage Users
        pageManageUsers();
        
        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // close sidebar
            closeSidebar();
        }
    }
    // user clicked
    else if(e.target.classList.contains('list-of-users__user')) {
        // fetch the info about the nationalities of the user
        getNationalities(e.target.textContent.toLowerCase())
        // show the user information in the user window
            .then(data => showUserInfo(data))
            .catch(err => console.log(err.message));
        
        // highlight the user button that is clicked
        highlightUserBtn(e.target.textContent);
    }
    else if(e.target.classList.contains('list-of-users__user-delete')) {
        // remove the corresponding user name from the list of users
        deleteUser(e.target.parentElement);

        // remove the corresponding user from the local storage
        deleteStoredUser(e.target.previousElementSibling.textContent);
    }
});

app.addEventListener('pointerover', e => {
    // the show/hide button is hovered over
    if(e.target.classList.contains('sidebar-btn-toggle')) {
        // display the tooltip message
        showTooltipMsg();
    }
});

app.addEventListener('pointerout', e => {
    // the cursor leaves the show/hide button
    if(e.target.classList.contains('sidebar-btn-toggle')) {
        // hide the tooltip message
        hideTooltipMsg();
    }
});

app.addEventListener('submit', e => {
    // the add user form is submitted by pressing the Add User button or the Enter key
    if(e.target.classList.contains('form-add-user')) {
        const userInput = getUserInput();
        const correctUserInput = checkUserInput(userInput);
        
        e.preventDefault();
        
        // if the value that is typed is correct (contains only letters and has the right length)
        if(correctUserInput) {
            // fetch the info about the nationalities of the user
            getNationalities(userInput)
            // show the user information in the user window
                .then(data => showUserInfo(data))
                .catch(err => console.log(err.message));
            
            // display the list of users
            displayListOfUsers();

            // add the typed user name to the list of users
            addUser(userInput);

            // store the user in local storage
            storeUser(userInput);

            // highlight the user button that has the same text content os the user input
            highlightUserBtn(userInput);

            // remove feedback
            showFeedbackNone();

            // remove the typed user name from the input field
            clearUserInput();
        }
        // if the value that is typed is incorrect (doesn't contain only letters and is too short or too long)
        else {
            showFeedbackError();
        }
    }
});

app.addEventListener('keyup', e => {
    // a key is reseased when the add user input field is in focus
    if(e.target.classList.contains('form-add-user__input')) {
        const correctUserInput = checkUserInput(getUserInput());
        const noUserInput = getUserInput().length === 0;
        
        // the typed value is correct (contains only letters and has the right length)
        if(correctUserInput) {
            showFeedbackSuccess();
        }
        // there is no 
        else if(noUserInput && e.key !== 'Enter') {
            showFeedbackNone();
        }
        // the typed value is incorrect (doesn't contain only letters and/or is too short or too long) and the enter key wasn't pressed
        else if(!correctUserInput && e.key !== 'Enter') {
            showFeedbackError();
        }
    }
});

window.addEventListener('resize', () => {
    // if the sidebar is hidden...
    if(sidebar.classList.contains('sidebar-hidden')) {
        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // shrink the dashboard
            shrinkDashboard();
        }
        // if the user is on a tablet or a desktop...
        else if(window.innerWidth >= 768) {
            // extend the dashboard to full-screen
            extendDashboard();
        }
    }
    // if the sidebar is visible...
    else {
        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // turn the hamburger icon into an X
            activateBtnToggle();
            
            // shrink the dashboard
            disableScrolling();

            // show dark background
            showDarkBg();
        }
        // if the user is on a tablet or a desktop...
        else if(window.innerWidth >= 768) {
            // extend the dashboard to full-screen
            enableScrolling();

            // hide dark background
            hideDarkBg();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // load the page Home
    pageHome();
    
    // display the list of users
    displayListOfUsers();

    // fetch the info about the initial users from the API
    getUsers()
        // add each fetched user to the list of users
        .then(data => data.forEach(user => addUser(user.name)))
        .catch(err => console.log(err.message));

    // // add the users stored in local storage to the list of users
    addStoredUsers();

    // if the sidebar is hidden...
    if(sidebar.classList.contains('sidebar-hidden')) {
        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // shrink the dashboard
            shrinkDashboard();
        }
        // if the user is on a tablet or a desktop...
        else if(window.innerWidth >= 768) {
            // extend the dashboard to full-screen
            extendDashboard();
        }
    }
    // if the sidebar is visible...
    else {
        // if the user is on a mobile...
        if(window.innerWidth < 768) {
            // turn the hamburger icon into an X
            activateBtnToggle();
            
            // shrink the dashboard
            disableScrolling();

            // show dark background
            showDarkBg();
        }
        // if the user is on a tablet or a desktop...
        else if(window.innerWidth >= 768) {
            // extend the dashboard to full-screen
            enableScrolling();

            // hide dark background
            hideDarkBg();
        }
    }
});