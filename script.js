if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var addButton = document.getElementById("add-btn");
    addButton.addEventListener('click', addStudentClicked);

    var updateButton = document.getElementById("update-btn");
    updateButton.addEventListener('click', updateStudentClicked);

    var removeButton = document.getElementById("remove-btn");
    removeButton.addEventListener('click', removeStudentClicked);
}

function addStudentClicked() {
    var addNameInput = document.getElementById("add-name-input").value;
    var addEmailInput = document.getElementById("add-email-input").value;
    var addLevelInput = document.getElementById("add-level-input").value;

    var addNameInputValid = document.getElementById("add-name-input").validity.valid;
    var addEmailInputValid = document.getElementById("add-email-input").validity.valid;
    var addLevelInputValid = document.getElementById("add-level-input").validity.valid;
    //console.log(addNameInputValid)
    //console.log(addEmailInputValid)
    //console.log(addLevelInputValid)

    if (addNameInput == ''){
        alert('Please enter your name');
        return;
    }else if (addEmailInput == ''){
        alert('Please enter your email');
        return;
    }else if (addLevelInput == ''){
        alert('Please enter your level');
        return;
    }

    if (!addNameInputValid){
        alert('Invalid name');
        return;
    }else if (!addEmailInputValid){
        alert('Invalid email');
        return;
    }else if (!addLevelInputValid){
        alert('Invalid level - Please enter your level in the format "{first,second,third,fourth}-year"');
        return;
    }else {
        console.log("valid")
        var tableBody = document.getElementsByClassName('t-body')[0];
        var tableRow = document.createElement('tr');
        var tableRowContents = `
            <td class="student-name">${addNameInput}</td>
            <td class="student-email">${addEmailInput}</td>
            <td class="student-level">${addLevelInput.toLowerCase()}</td>`
        tableRow.innerHTML = tableRowContents;
        tableBody.append(tableRow);

    }
}

function updateStudentClicked(){
    var oldEmailInput = document.getElementById("old-email-input").value;
    var updateNameInput = document.getElementById("update-name-input").value;
    var updateEmailInput = document.getElementById("update-email-input").value;
    var updateLevelInput = document.getElementById("update-level-input").value;

    var oldEmailInputValid = document.getElementById("old-email-input").validity.valid;
    var updateNameInputValid = document.getElementById("update-name-input").validity.valid;
    var updateEmailInputValid = document.getElementById("update-email-input").validity.valid;
    var updateLevelInputValid = document.getElementById("update-level-input").validity.valid;

    /*console.log(oldEmailInputValid)
    console.log(updateNameInputValid)
    console.log(updateEmailInputValid)
    console.log(updateLevelInputValid)*/

    if (oldEmailInput == ''){
        alert('Please enter a preexisting email');
        return;
    }

    if (!updateNameInputValid){
        alert('New name invalid');
        return;
    }else if (!updateEmailInputValid){
        alert('New email invalid');
        return;
    }else if (!updateLevelInputValid){
        alert('New level invalid - Please enter your level in the format "{first,second,third,fourth}-year"');
        return;
    }else if (!oldEmailInputValid){
        alert("Invalid email");
        return;
    }

    var studentEmails = document.getElementsByClassName("student-email");

    var updateEmail;
    var emailFound = false;
    for (var i = 0; i < studentEmails.length; ++i){ // find email in table
        if (studentEmails[i].innerText == oldEmailInput){
            updateEmail = studentEmails[i]
            emailFound = true;
            break;
        }
    }

    if (!emailFound){
        alert('Email not found');
        return;
    }

    var updateRow = updateEmail.parentElement;

    if (updateNameInput != ''){
        var newName = updateRow.getElementsByClassName("student-name")[0];
        newName.innerText = updateNameInput;
    }

    if (updateEmailInput != ''){
        var newEmail = updateRow.getElementsByClassName("student-email")[0];
        newEmail.innerText = updateEmailInput;
    }

    if (updateLevelInput != ''){
        var newLevel = updateRow.getElementsByClassName("student-level")[0];
        newLevel.innerText = updateLevelInput.toLowerCase();
    }
}

function removeStudentClicked(){
    var removeEmailInput = document.getElementById("remove-email-input").value;
    var removeEmailInputValid = document.getElementById("remove-email-input").validity.valid;

    if (removeEmailInput == ''){
        alert('Please enter a preexisting email');
        return;
    }

    if (!removeEmailInputValid){
        alert("Invalid email");
        return;
    }

    var removeEmail;
    var emailFound = false;
    var studentEmails = document.getElementsByClassName("student-email");

    for (var i = 0; i < studentEmails.length; ++i){ // find email in table
        if (studentEmails[i].innerText == removeEmailInput){
            removeEmail = studentEmails[i]
            emailFound = true;
            break;
        }
    }

    if (!emailFound){
        alert('Email not found');
        return;
    }

    var removeRow = removeEmail.parentElement;
    while (removeRow.hasChildNodes()) {
        removeRow.removeChild(removeRow.firstChild)
    }
}
