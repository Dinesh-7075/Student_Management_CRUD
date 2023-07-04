let arr = [
    {
      ID: 1,
      name: "Alice",
      age: 21,
      gpa: 8.52,
      degree: "Btech",
      email: "alice@example.com",
    },
    {
      ID: 2,
      name: "Bob",
      age: 22,
      gpa: 8.3,
      degree: "MBA",
      email: "bob@example.com",
    },
    {
      ID: 3,
      name: "Charlie",
      age: 20,
      gpa: 7,
      degree: "Arts",
      email: "charlie@example.com",
    },
  ];
  
  const formContainer = document.getElementById("form-container");
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("search-box");
  const btn = document.getElementById("btn");
  let isEditing = false;
  let currStudentId = null;
  
  renderFormDataToTable();
  
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const gpaInput = document.getElementById("gpa");
    const degreeInput = document.getElementById("degree");
    const emailInput = document.getElementById("email");
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const grade = gpaInput.value;
    const degree = degreeInput.value;
    const email = emailInput.value;
  
    if (isEditing) {
      updateStudent(currStudentId, name, age, grade, degree, email);
    } else {
      addStudent(name, age, grade, degree, email);
    }
  
    formContainer.reset();
    isEditing = false;
    currStudentId = null;
    renderFormDataToTable();
  });
  
  searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = arr.filter(function (student) {
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
      );
    });
    renderFormDataToTable(filteredStudents);
  });
  
  function renderFormDataToTable(studentsArray = arr) {
    tableBody.innerHTML = "";
  
    studentsArray.forEach((student) => {
      const row = document.createElement("tr");
  
      const idCell = document.createElement("td");
      idCell.innerText = student.ID;
      row.appendChild(idCell);
  
      const nameCell = document.createElement("td");
      nameCell.innerText = student.name;
      row.appendChild(nameCell);
  
      const emailCell = document.createElement("td");
      emailCell.innerText = student.email;
      row.appendChild(emailCell);
  
      const ageCell = document.createElement("td");
      ageCell.innerText = student.age;
      row.appendChild(ageCell);
  
      const gpaCell = document.createElement("td");
      gpaCell.innerText = student.gpa;
      row.appendChild(gpaCell);
  
      const degreeCell = document.createElement("td");
      degreeCell.innerText = student.degree;
      row.appendChild(degreeCell);
      const editButton = document.createElement("button");
      editButton.style.backgroundColor = "black";
      editButton.style.border = "none";
  
      const img1 = document.createElement("img");
      img1.setAttribute("id", "edit-btn");
      img1.src = "./images/edit 1.png";
      img1.setAttribute("id", "edit-btn");
      img1.alt = "Image";
  
      editButton.appendChild(img1);
      editButton.addEventListener("click", () => {
        fillFormForEdit(student);
      });
      degreeCell.appendChild(editButton);
  
      const trashButton = document.createElement("button");
      trashButton.id = "imageContainer";
      trashButton.style.backgroundColor = "black";
      trashButton.style.border = "none";
  
      const img2 = document.createElement("img");
      img2.setAttribute("id", "trash-btn");
      img2.src = "./images/trash-2 1.png";
      img2.alt = "trash-Image";
      trashButton.appendChild(img2);
      trashButton.addEventListener("click", function () {
        deleteStudent(student.ID);
        renderFormDataToTable();
      });
      degreeCell.appendChild(trashButton);
      row.appendChild(degreeCell);
      tableBody.appendChild(row);
    });
  }
  
  //Add Form
  function addStudent(name, age, gpa, degree, email) {
    const newStudent = {
      ID: arr.length + 1,
      name: name,
      age: age,
      gpa: gpa,
      degree: degree,
      email: email,
    };
    arr.push(newStudent);
  }
  
  //Edit details
  function updateStudent(studentId, name, age, gpa, degree, email) {
    const student = arr.find((student) => {
      return student.ID === studentId;
    });
  
    if (student) {
      student.name = name;
      student.age = age;
      student.gpa = gpa;
      student.degree = degree;
      student.email = email;
    }
  }
  
  //Delete function
  function deleteStudent(studentId) {
    const index = arr.findIndex(function (student) {
      return student.ID === studentId;
    });
  
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
  
  // Edit form details
  function fillFormForEdit(arr) {
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const gpaInput = document.getElementById("gpa");
    const degreeInput = document.getElementById("degree");
    const emailInput = document.getElementById("email");
    nameInput.value = arr.name;
    ageInput.value = arr.age;
    gpaInput.value = arr.gpa;
    degreeInput.value = arr.degree;
    emailInput.value = arr.email;
  
    btn.innerText = "Edit Student";
    isEditing = true;
    currStudentId = arr.ID;
  }
  
  btn.addEventListener("click", function () {
    formContainer.reset();
    isEditing = false;
    currStudentId = null;
    btn.innerText = "Add Student";
  });