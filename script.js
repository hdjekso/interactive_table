if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

var EmailValueCounter = 2; //used to index added emails

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

    var addLevelInputValue = document.getElementById('add-level-select').value;
    var addLevelInput = document.getElementById("add-level-select").options[addLevelInputValue].text;

    //input validation
    var addNameInputValid = document.getElementById("add-name-input").validity.valid;
    var addEmailInputValid = document.getElementById("add-email-input").validity.valid;

    //checking for empty input
    if (addNameInput == ''){
        alert('Please enter your name');
        return;
    }else if (addEmailInput == ''){
        alert('Please enter your email');
        return;
    }else if (addLevelInputValue == '0'){
        alert('Please select your level');
        return;
    }

    
    //checking for invalid input
    if (!addNameInputValid){
        alert('Invalid name');
        return;
    }else if (!addEmailInputValid){
        alert('Invalid email');
        return;
    }
    
    var studentEmails = document.getElementsByClassName("student-email");
    var emailFound = false;
    for (var i = 0; i < studentEmails.length; ++i){ // checking if email already exists
        if (studentEmails[i].innerText == addEmailInput){
            emailFound = true;
            break;
        }
    }
    if (emailFound){
        alert('Email already exists');
        return;
    }else {
        //add to table
        var tableBody = document.getElementsByClassName('t-body')[0];
        var tableRow = document.createElement('tr');
        var tableRowContents = `
            <td class="student-name">${addNameInput}</td>
            <td class="student-email">${addEmailInput}</td>
            <td class="student-level">${addLevelInput.toLowerCase()}</td>`
        tableRow.innerHTML = tableRowContents;
        tableBody.append(tableRow);

        //add to update select
        var oldEmailSelect = document.getElementById('old-email-select');
        var oldEmailOption = document.createElement('option');
        oldEmailOption.value = EmailValueCounter.toString(); //adding value (index)
        var oldEmailOptionContents = `
        ${addEmailInput}`
        oldEmailOption.innerHTML = oldEmailOptionContents;
        oldEmailSelect.append(oldEmailOption);

        //add to remove select
        var removeEmailSelect = document.getElementById('remove-email-select');
        var removeEmailOption = document.createElement('option');
        removeEmailOption.value = EmailValueCounter.toString(); //adding value (index)
        var removeEmailOptionContents = `
        ${addEmailInput}`
        removeEmailOption.innerHTML = removeEmailOptionContents;
        removeEmailSelect.append(removeEmailOption);

        EmailValueCounter += 1;

        //reset inputs/ selections
        document.getElementById("add-name-input").value = ''; // reset name field
        document.getElementById("add-email-input").value = ''; // reset email field
        document.getElementById('add-level-select').value = '0'; // reset level field

    }
}

function updateStudentClicked(){
    var updateNameInput = document.getElementById("update-name-input").value;
    var updateEmailInput = document.getElementById("update-email-input").value;

    //selecting old email
    var oldEmailInputValue = document.getElementById('old-email-select').value; //value/index
    var oldEmailInputSelect = document.getElementById('old-email-select')
    var oldEmailInput = oldEmailInputSelect.options[oldEmailInputSelect.selectedIndex].text;
    console.log(oldEmailInput);

    //selecting level
    var updateLevelInputValue = document.getElementById('update-level-select').value;
    var updateLevelInputSelect = document.getElementById('update-level-select');
    var updateLevelInput = updateLevelInputSelect.options[updateLevelInputSelect.selectedIndex].text;

    //input validation
    var updateNameInputValid = document.getElementById("update-name-input").validity.valid;
    var updateEmailInputValid = document.getElementById("update-email-input").validity.valid;

    if (oldEmailInputValue == '0'){
        alert('Please select an email');
        return;
    }

    if (!updateNameInputValid){
        alert('New name invalid');
        return;
    }else if (!updateEmailInputValid){
        alert('New email invalid');
        return;
    }
    
    var studentEmails = document.getElementsByClassName("student-email");

    var updateEmail;
    var emailFound = false; // new email found

    for (var i = 0; i < studentEmails.length; i++){ // find old email in table
        if (studentEmails[i].innerText == oldEmailInput){
            updateEmail = studentEmails[i];
            break;
        }
    }

    for (var i = 0; i < studentEmails.length; ++i){ // find new email in table (see if it already exists)
        if (studentEmails[i].innerText == updateEmailInput){
            emailFound = true;
            break;
        }
    }

    if (emailFound){
        alert('Email already exists');
        return;
    }

    //update table
    var updateRow = updateEmail.parentElement;
    if (updateNameInput != ''){
        var newName = updateRow.getElementsByClassName("student-name")[0];
        newName.innerText = updateNameInput;
    }

    if (updateEmailInput != ''){
        //update email in table
        var newEmail = updateRow.getElementsByClassName("student-email")[0];
        newEmail.innerText = updateEmailInput;
        
        //update update select
        oldEmailInputSelect.options[oldEmailInputSelect.selectedIndex].innerHTML = updateEmailInput;

        //update remove select
        var removeEmailInputSelect = document.getElementById('remove-email-select');
        removeEmailInputSelect.options[oldEmailInputSelect.selectedIndex].innerHTML = updateEmailInput;
    }

    if (updateLevelInputValue != '0'){
        var newLevel = updateRow.getElementsByClassName("student-level")[0];
        newLevel.innerText = updateLevelInput.toLowerCase();
    }

    //reset inputs/ selections
    document.getElementById("update-name-input").value = ''; // reset new name field
    document.getElementById("update-email-input").value = ''; // reset new email field
    document.getElementById('add-level-select').value = '0'; // reset new level field
    document.getElementById('old-email-select').value = '0' // reset old email select field
}

function removeStudentClicked(){

    var removeEmailInputValue = document.getElementById('remove-email-select').value; // value/ index of removed email
    var removeEmailInputSelect = document.getElementById('remove-email-select');
    var removeEmailInput = document.getElementById("remove-email-select").options[removeEmailInputSelect.selectedIndex].text;

    if (removeEmailInputValue == '0'){
        alert('Please select an email');
        return;
    }

    var removeEmail;
    var studentEmails = document.getElementsByClassName("student-email");

    var index;
    for (var i = 0; i < studentEmails.length; ++i){ // find email in table
        if (studentEmails[i].innerText == removeEmailInput){
            removeEmail = studentEmails[i];
            index = i;
            break;
        }
    }

    //remove from table
    var removeRow = removeEmail.parentElement;
    var removeTable = removeRow.parentElement;
    removeTable.removeChild(removeTable.children[index]);

    //remove from update select
    var oldEmailSelect = document.getElementById('old-email-select');
    oldEmailSelect.removeChild(oldEmailSelect.options[removeEmailInputSelect.selectedIndex]);

    //remove from remove select
    var removeEmailSelect = document.getElementById('remove-email-select');
    removeEmailSelect.removeChild(removeEmailSelect.options[removeEmailInputSelect.selectedIndex]);

    document.getElementById('remove-email-select').value = '0'; // reset default selection option to (select one)
}