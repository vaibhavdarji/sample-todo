import React from "react";
import { render, screen, waitForElementToBeRemoved } from "../custom-render";
import TodoList from "./TodoList";
import { mockTodoList } from "../api/makeTodoList";

describe("<TodoList />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Renders <TodoList /> component", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockTodoList));
    // fetch.mockResponse(request => {
    //   if (request.url === "https://jsonplaceholder.typicode.com/todos") {
    //     return Promise.resolve(JSON.stringify(mockTodoList));
    //   } else if (request.url === "https://jsonplaceholder.typicode.com/todos/1") {
    //     return Promise.resolve(JSON.stringify({
    //       id: 1, title: "todo item 1", userId: 1, completed: true
    //     }))
    //   } else {
    //     return Promise.resolve(JSON.stringify({}));
    //   }
    // })
    render(<TodoList />);
    expect(
        screen.getByText(/Fetching todo list/i)
      ).toBeInTheDocument();
    
    
      await waitForElementToBeRemoved(() => screen.getByText(/Fetching todo list/i));
      expect(fetch).toHaveBeenCalledTimes(1);
      
      mockTodoList.forEach(todo => {
        expect(screen.getByText(todo.title)).toBeInTheDocument();
      });
  });
});