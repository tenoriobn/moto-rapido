import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
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

export const Select = styled.select`
  outline: none;
  width: 100%;

  &:focus {
    outline: 2px solid #007bff;
  }
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
  background-color: #fff;

  border-bottom: 1px solid #c8cad0;
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
export const ListItemCab = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #c8cad0;

  margin-bottom: 10px;

  p {
    margin: 0;
    font-size: 16px;
  }
`;

export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
