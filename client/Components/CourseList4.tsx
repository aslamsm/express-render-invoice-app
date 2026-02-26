import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Course: describes the shape of each course item we expect from the API.
 * Keeping an interface helps TypeScript catch incorrect property usage.
 */
interface Course {
  id: number;
  title: string;
  description: string;
}

const CourseList4 = () => {
  // API base URL for courses (replace with your own endpoint if needed)
  const API_URL: string = "https://67a75555203008941f674e2f.mockapi.io/courses";

  // `courses` state: holds the list of courses fetched from the API.
  const [courses, setCourses] = useState<Course[]>([]);

  /**
   * fetchCourses:
   * - Calls the API to get all courses
   * - Parses the JSON response and stores it in state with `setCourses`
   * - Called initially in useEffect and also after delete to refresh the list
   */
  const fetchCourses = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setCourses(data);
  };

  // Load courses once when the component mounts.
  useEffect(() => {
    fetchCourses();
  }, []);

  /**
   * deleteCourse:
   * - Asks the user to confirm deletion using window.confirm
   * - Sends a DELETE request for the selected course id if confirmed
   * - Calls `fetchCourses()` afterwards to refresh the UI
   */
  const deleteCourse = async (id: number) => {
    const isDeleteConfirmed = window.confirm(
      "Are you sure you want to delete record? "
    );

    if (isDeleteConfirmed == true) {
      const deleteUrl = `${API_URL}/${id}`;
      await fetch(deleteUrl, { method: "DELETE" });
      // Refresh the list after deleting so UI shows current data
      fetchCourses();
    }
  };

  return (
    <div id="container">
      {/* Page title */}
      <h1 className="text-danger">Course List</h1>

      {/* Link to Add Course page */}
      <Link to={`/add-course`} className="btn btn-primary my-3">
        <i className="bi-plus-circle me-2"></i>
        Add Course
      </Link>

      {/* Courses table */}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            // Each table row must have a unique `key` for React reconciliation
            <tr key={course.id}>
              <th scope="row">{course.id}</th>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>
                {/* Edit navigates to the edit route for the specific course */}
                <Link
                  to={`/edit-course/${course.id}`}
                  className="btn btn-warning me-3"
                >
                  <i className="bi-pencil-square me-2"></i>Edit
                </Link>

                {/* Delete triggers the deleteCourse handler */}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCourse(course.id)}
                >
                  <i className="bi-trash me-2"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList4;
