import { useSearchPerson } from 'src/hooks/pessoa/useSearchPerson';
import { ButtonSearchForm, FilterInputContainer, FilterSelectContainer, Form, Label } from 'src/styles/styledComponents/formFilterStyles'

export default function SearchFilterGerenciarPessoa() {
  const { filter, setFilter, handleSearch } = useSearchPerson();

  return (
    <Form onSubmit={handleSearch} method="POST">
      <FilterInputContainer>
        <Label htmlFor="identifier">Buscar por:</Label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          placeholder="Digite o Nome ou CPF"
          onChange={(e) => setFilter({ ...filter, identifier: e.target.value })} 
          value={filter.identifier || ''}
          autoComplete="off"
          required
        />
      </FilterInputContainer>

      <FilterSelectContainer>
        <Label htmlFor="searchOption">Critério de busca:</Label>
        <select
          id="searchOption"
          name="searchOption"
          value={filter.searchOption || ''}
          onChange={(e) => setFilter({ ...filter, searchOption: e.target.value })} 
          required
        >
          <option value="">Selecione</option>
          <option value="name">Name</option>
          <option value="cpf">CPF</option>
        </select>
      </FilterSelectContainer>

      <ButtonSearchForm type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </ButtonSearchForm>
    </Form>
  );
}