import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SpecificBook from "../components/SpecificBook";
import { BooksContext } from '../context/BooksContext';
import userEvent from '@testing-library/user-event';

const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    level: "Beginner",
    tags: ["test"],
    price: 10,
    amount: 5,
    description: "Test description",
    image: null
};

const mockGetCountInCart = jest.fn(() => 0);
const mockAddToCart = jest.fn();

const setup = () => {
    render(
        <BooksContext.Provider value={{ books: [mockBook], getCountInCart: mockGetCountInCart, addToCart: mockAddToCart }}>
            <SpecificBook />
        </BooksContext.Provider>
    );
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");
    const input = screen.getByRole("spinbutton");
    const totalAmount = screen.getByText(/Total price/).nextSibling;
    return { incrementButton, decrementButton, input, totalAmount };
};

describe("Тестування сторінки 'Окрема книга'", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("При кліку збільшення кількості - кількість повинна збільшуватися", async () => {
        const { incrementButton, input } = setup();
        expect(incrementButton).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "2" } });
        expect(input.value).toBe("2");
        await userEvent.click(incrementButton);
        expect(input.value).toBe("3");
    });

    test("При кліку зменшення кількості - кількість повинна зменшуватися", async () => {
        const { decrementButton, input } = setup();
        expect(decrementButton).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "2" } });
        expect(input.value).toBe("2");
        await userEvent.click(decrementButton);
        expect(input.value).toBe("1");
    });

    test("При зміні кількості - загальна вартість повинна змінюватися", () => {
        const { input, totalAmount } = setup();
        expect(input).toBeInTheDocument();
        expect(totalAmount).toBeInTheDocument();
        expect(totalAmount.textContent).toBe("10");
        fireEvent.change(input, { target: { value: "2" } });
        expect(totalAmount.textContent).toBe("20");
    });
});
