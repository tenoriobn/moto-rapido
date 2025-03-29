import { useSearchManutencaoCorretiva } from 'src/hooks/manutencaoCorretiva/useSearchManutencaoCorretiva';
import { ButtonSearchForm, FilterInputContainer, Form, Label } from 'src/styles/styledComponents/formFilterStyles'

export default function SearchFilterManutencaoCorretiva() {
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
      
      <ButtonSearchForm type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </ButtonSearchForm>
    </Form>
  );
}