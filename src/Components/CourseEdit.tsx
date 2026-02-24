import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Define the shape of a Course object we expect from the API.
// Using an interface makes it clear what properties the component reads/updates.
interface Course {
  id: string;
  title: string;
  description: string;
}

// Base API endpoint for courses. Replace with your own endpoint if needed.
const API_URL = "https://67a75555203008941f674e2f.mockapi.io/courses";

const CourseEdit: React.FC = () => {
  // `course` holds the fetched course data. Start as `null` until loaded.
  // Using `Course | null` indicates the "not-yet-loaded" state clearly.
  const [course, setCourse] = useState<Course | null>(null);

  // get route params (e.g., the course id from the route /courses/:id)
  const params = useParams();

  // navigate programmatically after successful update
  const navigate = useNavigate();

  // fetchCourse: retrieves a single course by id and stores it in state
  const fetchCourse = async () => {
    // build the specific resource URL using the id from route params
    const response = await fetch(`${API_URL}/${params.id}`);
    // parse JSON response and set course state
    const data = await response.json();
    setCourse(data);
  };

  // updateCourse: sends updated course object to the API
  const updateCourse = async () => {
    // Send PUT request to update the course at the specific id endpoint.
    // We stringify the `course` object stored in component state.
    await fetch(`${API_URL}/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    // After successful update, navigate back to the courses list.
    navigate("/courses");
  };

  // Load the course once when the `params.id` changes.
  // Empty dependency would run once; including `params.id` ensures refetch if route changes.
  useEffect(() => {
    fetchCourse();
  }, [params.id]);

  // While `course` is null (not loaded yet), show a simple loading indicator.
  // This prevents runtime errors from accessing `course.title` when `course` is null.
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>✏ Edit Course</h2>
      <div className="border p-4 shadow-sm">
        <div className="mb-3">
          {/* Title input
              - value is bound to `course.title`
              - onChange updates the `course` state using `setCourse`
              - we spread the existing `course` and replace only the title property
              - this is safe here because we return early when `course` is null above
          */}
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          {/* Description textarea
              - controlled component bound to `course.description`
              - onChange updates the description while keeping other fields intact
          */}
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>

        {/* Update button triggers the `updateCourse` function */}
        <button className="btn btn-primary" onClick={updateCourse}>
          Update
        </button>

        {/* Cancel link navigates back to courses) */}
        <Link to="/courses" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default CourseEdit;
