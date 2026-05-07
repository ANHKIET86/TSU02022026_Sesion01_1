// Object mẫu
let student = {
  id: 1,
  name: "Nguyen Van A",
  gender: "nam",
  age: 20,
  mark: 8
};

// Tạo newStudent
let newStudent = {
  id: 2,
  name: "Tran Thi B",
  gender: "nu",
  age: 21,
  mark: 9
};

// Mảng students
let students = [];

// Thêm vào mảng
students.push(student);
students.push(newStudent);

// Truy xuất newStudent
console.log("Thông tin newStudent:");
console.log(newStudent);