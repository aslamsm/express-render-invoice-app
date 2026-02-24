let courses = [
  "Full Stack Web Development",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
  "Machine Learning",
  "DevOps",
  "Mobile App Development",
  "Blockchain Technology",
  "Internet of Things (IoT)",
];

function CourseList2() {
  return (
    <div>
      <h1>Course List 1</h1>
      <ul className="list-group">
        {courses.map((course) => (
          <li className="list-group-item">{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList2;
