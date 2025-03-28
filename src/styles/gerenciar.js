import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  border-bottom: 1px solid #c8cad0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;

export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
