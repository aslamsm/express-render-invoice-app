type GreetingProps = {
    name: string;
}

function Greeting(props: GreetingProps) {
  return <h2 className="text-primary">Hello, {props.name}</h2>;
}

export default Greeting;
