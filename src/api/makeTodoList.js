const makeTodoList = (number=20) => {
    // returns n number of to-do items
    return Array.from(Array(number).keys()).map(index => ({
      id: index + 1,
      userId: index + 1,
      title: `Todo item ${index + 1}`,
      completed: [true, false][Math.floor(Math.random() * 2)],
    }));
  };
  
  export const mockTodoList = makeTodoList(20);