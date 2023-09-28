const students = [
    {
        "studentId":"610001",
        "firstname":"John",
        "lastname":"Smith",
        "courses":[
            {
                "courseId": "CS303",
                "coursename": "Web Application Programming in JavaScript",
                "semester": "2021-Spring",
                "grade": 99
            },
            {
                "courseId": "CS445",
                "coursename": "Modern Asynchronous Programming",
                "semester": "2021-Spring",
                "grade": 95
            },
            {
                "courseId": "CS477",
                "coursename": "Server Side Programming",
                "semester": "2021-Fall",
                "grade": 90
            }
        ]
    },
    {
        "studentId":"610002",
        "firstname":"Edward",
        "lastname":"Jack",
        "courses":[
            {
                "courseId":"CS472",
                "coursename":"Web Application Programming",
                "semester":"2021-Spring",
                "grade":82
            },
            {
                "courseId":"CS544",
                "coursename":"Web Application Architecture",
                "semester":"2021-Spring",
                "grade":88
            }
        ]
    }
]

module.exports = class Student {
    constructor(studentId) {
        this.studentId = studentId;
    }

    getAverage(semester) {
        let student = students.find(student => student.studentId === this.studentId);
        if (student) {
            let courses = [];
            if (semester) {
                courses = student.courses.filter(course => course.semester === semester);
                if (courses.length < 1) {
                    throw new Error("Couldn’t find semester " + semester);
                }
            } else {
                courses = student.courses;
            }
            let gradeAverage = courses.reduce((a, b) => a + b.grade, 0) / courses.length;
            console.log(courses);
            return {
                average: gradeAverage 
            }
        } else {
            throw new Error("Student does not exist with Student ID " + this.studentId);
        }
    }
}