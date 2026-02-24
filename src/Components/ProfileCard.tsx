type ProfileCardProps = {
  name: string;
  designation: string;
  skills: string[];
};

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="container mx-auto">
      <h3 className="text-primary">{props.name}</h3>
      <h4 className="text-secondary">{props.designation}</h4>
      <h5 className="text-danger">Skills</h5>
      <ul>
        {props.skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
export default ProfileCard;
