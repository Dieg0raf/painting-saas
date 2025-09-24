import Expandable from "./Expandable";
const Todos = async () => {
  const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todosData = await todos.json();
  return (
    <div className="flex flex-col gap-2">
      {todosData.map((todo: { id: number; title: string }) => (
        <Expandable key={todo.id}>{todo.title}</Expandable>
      ))}
    </div>
  );
};

export default Todos;
