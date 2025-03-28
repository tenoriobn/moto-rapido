import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"; // Importa fireEvent para simular eventos
import { MemoryRouter } from "react-router-dom"; // Importa o MemoryRouter
import Signin from "./index"; // ajuste o caminho conforme necessário
import useAuth from "../../hooks/useAuth"; // ajuste o caminho conforme necessário
import '@testing-library/jest-dom'; // Importa os matchers do jest-dom

// Mock do hook useAuth
jest.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Signin Component", () => {
  beforeEach(() => {
    // Defina o comportamento padrão do mock do useAuth
    useAuth.mockReturnValue({
      signin: jest.fn(), // mocka a função signin
    });
  });

  test("renders MOTORÁPIDO - LOGIN label", () => {
    render(
      <MemoryRouter>
        <Signin /> {/* Envolve o Signin com MemoryRouter */}
      </MemoryRouter>
    );

    // Verifica se o texto da label está presente no documento usando o data-testid
    const labelElement = screen.getByTestId("login-label");
    expect(labelElement).toBeInTheDocument(); // espera que a label esteja no documento
  });

  test("shows error message when fields are empty", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    // Simula o clique no botão "Entrar"
    const buttonElement = screen.getByText("Entrar");
    fireEvent.click(buttonElement);

    // Verifica se a mensagem de erro está presente no documento
    const errorLabelElement = screen.getByTestId("error-label");
    expect(errorLabelElement).toBeInTheDocument(); // espera que a mensagem de erro esteja no documento
    expect(errorLabelElement).toHaveTextContent("Preencha todos os campos"); // espera que a mensagem de erro corresponda ao texto
  });
});
