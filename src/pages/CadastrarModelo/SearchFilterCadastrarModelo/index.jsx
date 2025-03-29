import { useSearchManutencaoCorretiva } from 'src/hooks/manutencaoCorretiva/useSearchManutencaoCorretiva';
import { ButtonSearchForm, FilterInputContainer, FilterSelectContainer, Form, Label } from 'src/styles/styledComponents/formFilterStyles'

export default function SearchFilterCadastrarModelo() {
  const { filtro, setFiltro, handleSearch } = useSearchManutencaoCorretiva();

  return (
    <Form onSubmit={handleSearch} method="POST">
      <FilterInputContainer>
        <Label htmlFor="vehicleIdentifier">Buscar por:</Label>
        <input
          type="text"
          id="vehicleIdentifier"
          name="vehicleIdentifier"
          placeholder="Digite a placa ou modelo"
          onChange={(e) => setFiltro({ ...filtro, vehicleIdentifier: e.target.value })} 
          value={filtro.vehicleIdentifier || ''}
          autoComplete="off"
          required
        />
      </FilterInputContainer>

      <FilterSelectContainer>
        <Label htmlFor="searchOption">Critério de busca:</Label>
        <select
          id="searchOption"
          name="searchOption"
          value={filtro.searchOption || ''}
          onChange={(e) => setFiltro({ ...filtro, searchOption: e.target.value })} 
          required
        >
          <option value="">Selecione</option>
          <option value="plate">Placa</option>
          <option value="model">Modelo</option>
        </select>
      </FilterSelectContainer>

      <ButtonSearchForm type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </ButtonSearchForm>
    </Form>
  );
}