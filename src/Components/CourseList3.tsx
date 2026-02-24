type Course = {
  id: number;
  name: string;
  duration: string;
  price: number;
};

const courses: Course[] = [
  {
    id: 1,
    name: "Full Stack Web Development",
    duration: "6 months",
    price: 999,
  },
  {
    id: 2,
    name: "Data Science",
    duration: "4 months",
    price: 799,
  },
  {
    id: 3,
    name: "Cybersecurity",
    duration: "5 months",
    price: 899,
  },
  {
    id: 4,
    name: "Cloud Computing",
    duration: "3 months",
    price: 699,
  },
  {
    id: 5,
    name: "Artificial Intelligence",
    duration: "6 months",
    price: 999,
  },
  {
    id: 6,
    name: "Machine Learning",
    duration: "4 months",
    price: 899,
  },
  {
    id: 7,
    name: "DevOps",
    duration: "3 months",
    price: 699,
  },
  {
    id: 8,
    name: "Mobile App Development",
    duration: "5 months",
    price: 899,
  },
  {
    id: 9,
    name: "Blockchain Technology",
    duration: "4 months",
    price: 799,
  },
  {
    id: 10,
    name: "Internet of Things (IoT)",
    duration: "3 months",
    price: 699,
  },
];

function CourseList3() {
  return (
    <div>
      <h1>Course List 1</h1>
      <ul className="list-group">
        {courses.map((course) => (
          <li className="list-group-item">
            <h2>{course.name}</h2>
            <p>Duration: {course.duration} </p>
            <p>Price: INR {course.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList3;
