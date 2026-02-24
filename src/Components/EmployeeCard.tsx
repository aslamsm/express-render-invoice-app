import "./EmployeeCard.css";

type EmployeeProps = {
  name: string;
  position: string;
  department: string;
  salary: number;
  children: any;
};

function EmployeeCard(props: EmployeeProps) {
  return (
    <div className="card">
      <div className="card-body shadow-sm border-0">
        <h3 className="card-title text-primary">{props.name}</h3>
        <h4 className="card-subtitle text-muted">{props.position}</h4>
        <p className="card-text">Department: {props.department}</p>
        <p className="card-text">Salary: ${props.salary}</p>
        {props.children}
      </div>
    </div>
  );
}
export default EmployeeCard;
