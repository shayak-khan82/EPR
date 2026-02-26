

export const ENDPOINT = {
  //ADMIN
  login:"/admin/login",
  regInsti:"/admin/regIsti",
  //institutes
  Institutes:"/institutes/login",
  createDept:"/institutes/create-dept",
  uploadFac:"/institutes/uploadFac",
  createCourse:"/institutes/createCourse",
  createSubject:"/institutes/createSubject",
  uploadStd:"/institutes/uploadStd",
  getAllLect:"/institutes/getAllLectures",
  LecturesAttd:(lectureId) =>`/institutes/classAttd/${lectureId}`,
  getId:"/institutes/getId",
  getStdntAttd:"/institutes/getStdntAttd/:studentId",

  //Faculties
  faculties:"/fac/login",
  createLeature:"/fac/createLecture",
  getLectures:"/fac/getLectures",
  LecturesAttu:"/fac/lectureAttd/:lectureId",
  ///rescheduleLectures

  rescheduleLectures:"/institutes/rescheduleLectures",


}