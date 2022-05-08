const request = new XMLHttpRequest();
let schedule = document.getElementById("schedule");
let semesterCount = 0;

// Adds a new semester (Max: 10 Semesters):
function addSemester() {
    if (semesterCount == 10) return;

    // Add Semester Container:
    semesterCount++;
    let li = document.createElement("li");
    li.id = "semester" + semesterCount.toString();
    li.className = "semester";

    // Add Header:
    let h4 = document.createElement("h4")
    h4.appendChild(document.createTextNode("Semester " + semesterCount.toString()));
    li.appendChild(h4);

    // Add Table:
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headRow = thead.insertRow();
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    // let th4 = document.createElement("th");
    
    tbody.id = "table" + semesterCount.toString();
    th1.innerHTML = "Name";
    th2.innerHTML = "Label";
    th3.innerHTML = "Credit Hours";
    // th4.innerHTML = "Schedule Information";
    
    headRow.appendChild(th1);
    headRow.appendChild(th2);
    headRow.appendChild(th3);
    // headRow.appendChild(th4);
    table.appendChild(thead);
    table.appendChild(tbody);
    li.appendChild(table);

    // Add Input Methods:
    let input = document.createElement("input");
    let addButton = document.createElement("button");
    let removeButton = document.createElement("button");

    input.type = "text";
    input.name = "input" + semesterCount.toString();
    input.placeholder = "Enter Course Name...";

    addButton.innerHTML = "Add Course";
    addButton.addEventListener("click", function() {addCourse(input.value, tbody.id)});
    removeButton.innerHTML = "Remove Course";
    removeButton.addEventListener("click", function() {removeCourse(input.value, tbody.id)});
    
    li.appendChild(input);
    li.appendChild(addButton);
    li.appendChild(removeButton);

    schedule.appendChild(li);
}

// Removes the most recent semester:
function removeSemester() {
    if (semesterCount == 0) return;
    let semesterID = "semester" + semesterCount.toString();
    let semester = document.getElementById(semesterID);
    semester.remove();
    semesterCount--;
}

// Adds a new course with the given name in the given semester:
function addCourse(name, tableID) {
    name = name.replace(/\s/g, "").toLowerCase();
    if (name == "" || document.getElementById(name) != null) return;

    let table = document.getElementById(tableID);
    let row = table.insertRow();
    row.id = name;

    let url = "http://127.0.0.1:5000/courses/" + name;
    request.open("GET", url);
    request.responseType = 'json';

    request.onload = function() {
        if (request.status >= 400) return;
        course = request.response;

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        // let cell4 = row.insertCell(3);
        
        cell1.innerHTML = course['name'];
        cell2.innerHTML = course['label'];
        cell3.innerHTML = course['hours'];

        /*
        if (course['schedule_info'] != null) {
           cell4.innerHTML = course['schedule_info'];
        } else {
            cell4.innerHTML = "None";
        }
        */
    };

    request.send();
}

// Removes the given course:
function removeCourse(name) {
    name = name.replace(/\s/g, "").toLowerCase();
    let row = document.getElementById(name);
    if (row == null) return;
    row.remove();
}