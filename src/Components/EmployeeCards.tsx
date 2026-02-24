import EmployeeCard from "./EmployeeCard";

function EmployeeCards() {
  return (
    <div>
      <EmployeeCard
        name="John Doe"
        position="HR Manager"
        department="HR"
        salary={2000}
      >
        <h4 className="text-secondary">More Info</h4>
        <p className="text-muted">
          John Doe is a Senior Employee who has been working with the company
          for 10 years.
        </p>
      </EmployeeCard>

      <EmployeeCard
        name="Usman Ghani"
        position="CEO"
        department="Executive"
        salary={4000}
      >
        <p className="text-muted">
          Usman Ghani is the founder of the company and has led it to success
          over the past 15 years.
        </p>
      </EmployeeCard>
    </div>
  );
}
export default EmployeeCards;
