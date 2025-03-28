import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext"; // Importando o UserProvider
import useAuth from "../../hooks/useAuth";
import * as C from "../../styles/home";
import CadastrarModelo from "../CadastrarModelo";
import GerenciarManutCorretiva from "../GerenciarManutCorretiva";
import GerenciarManutProgramada from "../GerenciarManutProgramada";
import GerenciarPessoa from "../GerenciarPessoa";
import GerenciarUsuario from "../GerenciarUsuario";
import CadastrarVeiculo from "../GerenciarVeiculo";
import Popup from "../Popup"; // Popup para exibir as mensagens
import RelatorioManutProgramada from "../RelatorioManutProgramada";
import RelatorioManutCorretiva from "../RelatorioManutCorretiva";
import RelatorioStatusVeiculo from "../RelatorioStatusVeiculo";

const Home = () => {
  const { signout, user, idUsuario } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [fontSize, setFontSize] = useState("13px");

  // estado para gerenciar a mensagem do popup
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // Tipo de popup (sucesso ou erro)
  const [popupTitle, setPopupTitle] = useState("");
  const [isGerenciarVeiculoOpen, setIsGerenciarVeiculoOpen] = useState(false);
  const [isGerenciarManutencaoOpen, setIsGerenciarManutencaoOpen] = useState(false);
  const [isRelatorioOpen, setIsRelatorioOpen] = useState(false);

  const handleSignout = () => {
    signout();
  };

  const handlePageChange = (page) => {
    // Se o clique for na mesma página, force um re-render
    if (activePage === page) {
      setActivePage(""); // Reseta o estado para forçar o re-render
      setTimeout(() => setActivePage(page), 0); // Reatribui após um ciclo de evento
    } else {
      setActivePage(page);
    }
    if (page !== "cadastrarVeiculo" && page !== "cadastrarModelo") {
      setIsGerenciarVeiculoOpen(false);
    }
    if (page !== "manutencaoCorretiva" && page !== "manutencaoProgramada") {
      setIsGerenciarVeiculoOpen(false);
    }
  };

  const handleHome = () => {
    setActivePage("home");
    setIsGerenciarVeiculoOpen(false);
    setIsGerenciarManutencaoOpen(false);
  };

  const increaseFontSize = () => {
    const newSize = parseInt(fontSize) + 2;
    setFontSize(`${newSize}px`);
  };

  const decreaseFontSize = () => {
    const newSize = parseInt(fontSize) - 2;
    if (newSize >= 12) {
      setFontSize(`${newSize}px`);
    }
  };

  // Função para exibir o popup
  const showPopupMessage = (title, message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupTitle(title);
    setTimeout(() => setPopupMessage(""), 4000); // Fecha o popup automaticamente após 3 segundos
  };

  const toggleGerenciarVeiculo = () => {
    setIsGerenciarVeiculoOpen(!isGerenciarVeiculoOpen);
    setIsGerenciarManutencaoOpen(false)
    setIsRelatorioOpen(false);
  };
  const toggleGerenciarManutencao = () => {
    setIsGerenciarManutencaoOpen(!isGerenciarManutencaoOpen);
    setIsGerenciarVeiculoOpen(false);
    setIsRelatorioOpen(false);
  };
  const toggleRelatorio = () => {
    setIsRelatorioOpen(!isRelatorioOpen);
    setIsGerenciarManutencaoOpen(false);
    setIsGerenciarVeiculoOpen(false);
  };

  return (
    <UserProvider idUsuario={idUsuario}>
      {" "}
      {/* Envolvendo com o UserProvider */}
      <C.Container>
        <C.Header>
          <C.Title>MOTORÁPIDO</C.Title>
          <C.FontControls>
            <C.FontButton
              onClick={increaseFontSize}
              aria-label="Aumenta tamanho da fonte"
            >
              A+
            </C.FontButton>
            <C.FontButton
              onClick={decreaseFontSize}
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </C.FontButton>
          </C.FontControls>
          <C.MenuButton
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            ☰
          </C.MenuButton>
        </C.Header>

        <C.Sidebar style={{ fontSize: fontSize }}>
          <C.SidebarLink
            as={Link}
            to="#"
            onClick={() => handlePageChange("home")}
          >
            Home <span>&#x2B9E;</span>
          </C.SidebarLink>

          <C.SidebarLink as={Link} to="#" onClick={toggleGerenciarManutencao}>
            Gerenciar Manutenção{" "}
            {isGerenciarManutencaoOpen ? (
              <span>&#x2B9D;</span>
            ) : (
              <span>&#x2B9F;</span>
            )}
          </C.SidebarLink>
          {isGerenciarManutencaoOpen && (
            <>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("manutencaoCorretiva")}
                style={{ paddingLeft: "20px" }}
              >
                Manutenção Corretiva<span>&#x2B9E;</span>
              </C.SidebarLink>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("manutencaoProgramada")}
                style={{ paddingLeft: "20px" }}
              >
                Manutenção Programada<span>&#x2B9E;</span>
              </C.SidebarLink>
            </>
          )}

          <C.SidebarLink
            as={Link}
            to="#"
            onClick={() => handlePageChange("gerenciarPessoa")}
          >
            Gerenciar pessoa <span>&#x2B9E;</span>
          </C.SidebarLink>

          <C.SidebarLink
            as={Link}
            to="#"
            onClick={() => handlePageChange("gerenciarUsuario")}
          >
            Gerenciar Usuario <span>&#x2B9E;</span>
          </C.SidebarLink>

          <C.SidebarLink as={Link} to="#" onClick={toggleGerenciarVeiculo}>
            Gerenciar Veículo{" "}
            {isGerenciarVeiculoOpen ? (
              <span>&#x2B9D;</span>
            ) : (
              <span>&#x2B9F;</span>
            )}
          </C.SidebarLink>
          {isGerenciarVeiculoOpen && (
            <>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("cadastrarVeiculo")}
                style={{ paddingLeft: "20px" }}
              >
                Cadastrar Veículo <span>&#x2B9E;</span>
              </C.SidebarLink>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("cadastrarModelo")}
                style={{ paddingLeft: "20px" }}
              >
                Cadastrar Modelo <span>&#x2B9E;</span>
              </C.SidebarLink>
            </>
          )}

          <C.SidebarLink as={Link} to="#" onClick={toggleRelatorio}>
            Relatórios{" "}
            {isRelatorioOpen ? (
              <span>&#x2B9D;</span>
            ) : (
              <span>&#x2B9F;</span>
            )}
          </C.SidebarLink>
          {isRelatorioOpen && (
            <>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("relatorioManutencaoProgramada")}
                style={{ paddingLeft: "20px" }}
              >
                Manutenção Programada <span>&#x2B9E;</span>
              </C.SidebarLink>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("relatorioManutencaoCorretiva")}
                style={{ paddingLeft: "20px" }}
              >
                Manutenção Corretiva <span>&#x2B9E;</span>
              </C.SidebarLink>
              <C.SidebarLink
                as={Link}
                to="#"
                onClick={() => handlePageChange("relatorioStatusVeiculo")}
                style={{ paddingLeft: "20px" }}
              >
                Status do Veículo <span>&#x2B9E;</span>
              </C.SidebarLink>
            </>
          )}

          <C.SidebarLink as={Link} to="#" onClick={handleSignout}>
            Sair
          </C.SidebarLink>
        </C.Sidebar>

        <C.Main>
          <C.Content style={{ fontSize: fontSize }}>
            {activePage === "home" && (
              <C.UserInfo>
                <h2>Bem-vindo, {user?.usuario}! </h2>
                <p>CPF: {user?.cpf}</p>
              </C.UserInfo>
            )}
            {activePage === "gerenciarUsuario" && (
              <GerenciarUsuario
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "cadastrarVeiculo" && (
              <CadastrarVeiculo
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "gerenciarPessoa" && (
              <GerenciarPessoa
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "cadastrarModelo" && (
              <CadastrarModelo
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "manutencaoProgramada" && (
              <GerenciarManutProgramada
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "manutencaoCorretiva" && (
              <GerenciarManutCorretiva
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}

            {activePage === "relatorioManutencaoProgramada" && (
              <RelatorioManutProgramada
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "relatorioManutencaoCorretiva" && (
              <RelatorioManutCorretiva
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
            {activePage === "relatorioStatusVeiculo" && (
              <RelatorioStatusVeiculo
                onUserCreated={handleHome}
                fontSize={fontSize}
                showPopupMessage={showPopupMessage}
              />
            )}
          </C.Content>
        </C.Main>

        {/* Exibe o Popup apenas se houver uma mensagem */}
        {popupMessage && (
          <Popup
            title={popupTitle}
            message={popupMessage}
            type={popupType}
            onClose={() => setPopupMessage("")} // Fechar o popup ao clicar no botão de fechar
          />
        )}
      </C.Container>
    </UserProvider>
  );
};

export default Home;
