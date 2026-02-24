import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// `Customer` type: defines the expected shape of each customer object
// returned by the backend. TypeScript will help catch accidental
// property access errors if the shape doesn't match.
type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: number;
};

const CustomerList = () => {
  // API endpoints used in this component. Update these if your server
  // runs on a different host/port or the route changes.
  const API_URL: string = "http://localhost:3000/customers";
  const LOGIN_URL: string = "http://localhost:3000/auth/login";

  // Local state:
  // - `customers`: array of customers to render in the table
  // - `token`: the JWT used for authenticated requests (optional)
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // login(): performs a simple POST to obtain a JWT. In a real app
  // you would collect user credentials from a form instead of hardcoding.
  // We save the token to localStorage so subsequent page loads can reuse it.
  const login = async () => {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // NOTE: hardcoded credentials for demo/testing only
        email: "javed@outlook.com",
        password: "topsecret",
      }),
    });

    const responseData = await response.json();
    // Response is expected to include a `token` field with the JWT.
    console.log("Login response:", responseData);
    setToken(responseData.token);

    // Persist token so we can reuse it across reloads.
    try {
      localStorage.setItem("tokenJWT", responseData.token);
    } catch (error) {
      // localStorage may throw in some environments (e.g., private mode)
      console.error("Error saving token to localStorage:", error);
    }
    return responseData.token;
  };

  // fetchCustomers(): retrieves the list of customers using the
  // provided JWT for authorization. Expects the API JSON response
  // to include a `data` property that is an array of customers.
  const fetchCustomers = async (jwtToken: string) => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const responseData = await response.json();
    // Update state with the returned customer array
    setCustomers(responseData.data);
  };

  // When the component mounts, try to load a saved token from
  // localStorage and fetch customers. If no token exists, call
  // `login()` to obtain one (demo flow only).
  useEffect(() => {
    const loadCustomers = async () => {
      console.log("Loading customers...");
      let jwtToken = null;
      try {
        jwtToken = localStorage.getItem("tokenJWT");
        console.log("Token retrieved from localStorage:", jwtToken);
      } catch (error) {
        // Handle environments where localStorage is unavailable
        console.error("Error retrieving token from localStorage:", error);
        jwtToken = null;
      }

      if (!jwtToken) {
        // No token stored: perform login to get a token for requests
        jwtToken = await login();
      } else {
        // If we found a token, save it into state for potential use
        setToken(jwtToken);
      }

      // Fetch the customers list using the obtained token
      fetchCustomers(jwtToken);
    };
    loadCustomers();
  }, []);

  return (
    <div id="container">
      {/* Page title */}
      <h1 className="text-danger">Customer List</h1>

      {/* Link to Add Customer page */}
      <Link to={`/add-customer`} className="btn btn-primary my-3">
        <i className="bi-plus-circle me-2"></i>
        Add Customer +
      </Link>

      {/* Customers table
          - Headers describe each column
          - Rows are generated from the `customers` state array
      */}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            {/* Id column omitted from display but left here as an example */}
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Credit Limit</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over customers and render a table row for each one.
              Each row needs a unique `key` prop for React to track
              list re-ordering and updates efficiently.
          */}
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.creditLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
