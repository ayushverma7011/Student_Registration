const addStudentDialog = document.getElementById('addStudentDialog');
const openAddStudentDialogBtn = document.getElementById('openAddStudentDialog');
const studentForm = document.getElementById('studentForm');
const studentListContainer = document.getElementById('studentListContainer');

// Array to store Student Data
let students = [];

// Function to render Student Table
function renderTable() {
    if (students.length === 0) {
        studentListContainer.innerHTML = '<h2>Registered Students</h2><div class="empty-state">No students registered yet.</div>';
        return;
    }

    let tableHTML = `
    <table class="student-table">
    <thead>
        <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    `;
    
    students.forEach(student => {
        tableHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <i class="fas fa-trash-alt delete-btn" data-id="${student.id}"></i>
            </td>
        </tr>
        `;
    });

    tableHTML += `
    </tbody>
    </table>
    `;
    
    studentListContainer.innerHTML = `<h2>Registered Students</h2>` + tableHTML;
}
// Function to delete a student
function deleteStudent(studentId) {
    if (confirm(`Are you sure to remove the student with ID ${studentId}?`)) {
        students = students.filter(student => student.id !== studentId);
        renderTable();
    }
}
// Adding Event Listeners
openAddStudentDialogBtn.addEventListener('click', () => {
    addStudentDialog.showModal();
});

studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newStudent = {
        name: document.getElementById('studentName').value,
        id: document.getElementById('studentID').value, // Corrected: changed 'studentId' to 'studentID'
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
    };
    
    students.push(newStudent);
    
    console.log("New Student Added:", newStudent);
    renderTable();

    studentForm.reset();
    addStudentDialog.close();
});

studentListContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const studentId = e.target.getAttribute('data-id');
        deleteStudent(studentId);
    }
});

renderTable();