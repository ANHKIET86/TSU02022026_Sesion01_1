let maxStudent = students[0];

for (let i = 1; i < students.length; i++) {
    if (students[i].mark > maxStudent.mark) {
        maxStudent = students[i];
    }
}

console.log("Học sinh điểm cao nhất:");
console.log(maxStudent);