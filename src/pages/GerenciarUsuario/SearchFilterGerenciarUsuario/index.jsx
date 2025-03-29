import { useSearchFilterGerenciarUsuario } from 'src/hooks/usuario/useSearchFilterGerenciarUsuario';
import { ButtonSearchForm, FilterInputContainer,  Form, Label } from 'src/styles/styledComponents/formFilterStyles'

export default function SearchFilterGerenciarUsuario() {
  const { userId, setUserId, handleSearch } = useSearchFilterGerenciarUsuario();

  return (
    <Form onSubmit={handleSearch} method="POST">
      <FilterInputContainer>
        <Label htmlFor="identifier">Buscar por:</Label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          placeholder="Digite o Nome ou CPF"
          onChange={(e) => setUserId(e.target.value )} 
          value={userId || ''}
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