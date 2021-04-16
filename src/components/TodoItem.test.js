import React from 'react';
import { render, screen, waitForElementToBeRemoved } from "../custom-render";

import { useParams, MemoryRouter } from "react-router-dom";
import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it("can tell mocked from unmocked functions", () => {
        expect(jest.isMockFunction(useParams)).toBe(true);
        expect(jest.isMockFunction(MemoryRouter)).toBe(false);
      });
    
    it("Renders <TodoItem /> correctly for a completed item", async () => {
        fetch.mockResponseOnce(JSON.stringify({
            id: 1,
            title: "todo item 1",
            userId: 1, 
            completed: true
        }));
        useParams.mockReturnValue({ id: 1 });

        render(<TodoItem />);
        await waitForElementToBeRemoved(() =>
            screen.getByText(/Fetching todo item 1/i)
        );

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("Renders <TodoItem /> correctly for an uncompleted item", async () => {
        fetch.mockResponseOnce(JSON.stringify({
            id: 2,
            title: "todo item 2",
            userId: 2, 
            completed: false
        }));
        useParams.mockReturnValue({ id: 2 });
    
        render(<TodoItem />);
        await waitForElementToBeRemoved(() =>
          screen.getByText(/Fetching todo item 2/i)
        );
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/todo item 2/)).toBeInTheDocument();
        expect(screen.getByText(/Added by: 2/)).toBeInTheDocument();
        expect(
          screen.getByText(/This item is yet to be completed/)
        ).toBeInTheDocument();
      });
});