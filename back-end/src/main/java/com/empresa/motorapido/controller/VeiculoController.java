package com.empresa.motorapido.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.motorapido.dto.CustomResponseDto;
import com.empresa.motorapido.dto.VeiculoDto;
import com.empresa.motorapido.model.ManutencaoTipo;
import com.empresa.motorapido.model.Modelo;
import com.empresa.motorapido.model.Usuario;
import com.empresa.motorapido.model.Veiculo;
import com.empresa.motorapido.model.VeiculoStatus;
import com.empresa.motorapido.service.ManutencaoTipoService;
import com.empresa.motorapido.service.VeiculoModeloService;
import com.empresa.motorapido.service.VeiculoService;
import com.empresa.motorapido.service.VeiculoStatusService;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @Autowired
    private VeiculoStatusService veiculoStatusService;

    @Autowired
    private VeiculoModeloService veiculoModeloService;

    @Autowired
    private ManutencaoTipoService mmManutencaoTipoService;

    @GetMapping
    public List<Veiculo> getAllVeiculos() {
        return veiculoService.findAll();
    }

    @GetMapping("/search/id/{id}")
    public ResponseEntity<?> getVeiculoById(@PathVariable Long id) {
        Optional<Veiculo> veiculo = veiculoService.findById(id);
        if (veiculo.isPresent()) {
            return ResponseEntity.ok(veiculo.get());
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    @GetMapping("/search/nomemodelo/{nomeModelo}")
    public ResponseEntity<?> getLikeModelo(@PathVariable String nomeModelo) {
        List<Modelo> listaModelo = veiculoModeloService.findByLikeModelo(nomeModelo);
        if (listaModelo.isEmpty()) {

            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaModelo);
        }
    }

    @GetMapping("/search/modelo/{nomeModeloVeiculo}")
    public ResponseEntity<?> getVeiculoModeloById(@PathVariable String nomeModeloVeiculo) {
        List<VeiculoDto> listaVeiculo = veiculoService.findByModeloLike(nomeModeloVeiculo);
        if (listaVeiculo.isEmpty()) {

            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculo);
        }
    }

    @GetMapping("/search/placaveiculo/{numeroPlacaVeiculo}")
    public ResponseEntity<?> getVeiculoPlacaById(@PathVariable String numeroPlacaVeiculo) {
        List<VeiculoDto> listaVeiculo = veiculoService.findByPlacaLike(numeroPlacaVeiculo);
        if (listaVeiculo.isEmpty()) {

            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculo);
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> createVeiculo(@RequestBody VeiculoDto veiculoDto) {
        try {
            // Instanciação do objeto Veiculo
            Veiculo veiculo = new Veiculo();
            Modelo modelo = new Modelo();
            modelo.setIdModelo(veiculoDto.getIdModelo());

            VeiculoStatus veiculoStatus = new VeiculoStatus();
            veiculoStatus.setIdVeiculoStatus(veiculoDto.getIdVeiculoStatus());

            Usuario usuario = new Usuario();
            usuario.setIdUsuario(veiculoDto.getIdUsuario());

            // Preenchimento dos campos do veículo com os dados do DTO
            veiculo.setAno(veiculoDto.getAno());
            veiculo.setPlaca(veiculoDto.getPlaca());
            veiculo.setDataAquisicao(veiculoDto.getDataAquisicao());
            veiculo.setDistanciaDiaria(veiculoDto.getDistanciaDiaria());
            veiculo.setModelo(modelo);
            veiculo.setStatusVeiculo(veiculoStatus);
            veiculo.setUsuario(usuario);
            veiculo.setVidaUtilKm(veiculoDto.getVidaUtilKm());
            veiculo.setKmAtual(veiculoDto.getKmAtual());

            // Salvar o veículo no banco de dados
            veiculoService.save(veiculo);

            // Retorna resposta de sucesso com status 201 Created
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new CustomResponseDto("success", "Veiculo " +
                            veiculoDto.getPlaca() + " inserido com sucesso."));

        } catch (IllegalArgumentException e) {
            // Retorna erro de Bad Request 400, caso os dados fornecidos sejam inválidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new CustomResponseDto("erro", "Dados inválidos " +
                            e.getMessage()));
        } catch (Exception e) {
            // Retorna erro interno do servidor 500 para qualquer outra exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new CustomResponseDto("erro", "Erro ao processar a requisição " +
                            e.getMessage()));
        }
    }

    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizarVeiculo(@RequestBody VeiculoDto veiculoDto) {
        try {

            veiculoService.atualizarVeiculo(veiculoDto);

            return ResponseEntity.ok(new CustomResponseDto("success", "Veiculo " +
                    veiculoDto.getPlaca() + " atualizado com sucesso.")); // retona o objeto atualizado

        } catch (IllegalArgumentException e) {
            // Retorna erro de Bad Request 400, caso os dados fornecidos sejam inválidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new CustomResponseDto("erro", "Dados inválidos " +
                            e.getMessage()));
        } catch (Exception e) {
            // Retorna erro interno do servidor 500 para qualquer outra exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new CustomResponseDto("erro", "Erro ao processar a requisição " +
                            e.getMessage()));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVeiculo(@PathVariable Long id) {
        if (veiculoService.findById(id).isPresent()) {
            veiculoService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/insert/tbstatus")
    public ResponseEntity<VeiculoStatus> insertTbStarusVeiculo(@RequestBody VeiculoStatus veiculoStatus) {
        VeiculoStatus veiculoStatusRet = veiculoStatusService.save(veiculoStatus);
        return ResponseEntity.ok(veiculoStatusRet);
    }

    @PostMapping("/inserir/modelo")
    public ResponseEntity<?> insertTbModelo(@RequestBody Modelo modelo) {
        try {
            veiculoModeloService.save(modelo);
            return ResponseEntity.ok(new CustomResponseDto("success", "Veiculo " +
                    modelo.getModelo() + " inserido com sucesso."));
        } catch (IllegalArgumentException e) {
            // Retorna erro de Bad Request 400, caso os dados fornecidos sejam inválidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new CustomResponseDto("erro", "Dados inválidos " +
                            e.getMessage()));
        } catch (Exception e) {
            // Retorna erro interno do servidor 500 para qualquer outra exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new CustomResponseDto("erro", "Erro ao processar a requisição " + e.getMessage()));
        }
    }

    @PutMapping("/update/tbmodelo")
    public ResponseEntity<?> updateTbModelo(@RequestBody Modelo modelo) {
        try {
            veiculoModeloService.atualizaModelo(modelo);
            return ResponseEntity.ok(new CustomResponseDto("success", "Veiculo " +
                    modelo.getModelo() + " inserido com sucesso."));
        } catch (IllegalArgumentException e) {
            // Retorna erro de Bad Request 400, caso os dados fornecidos sejam inválidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new CustomResponseDto("erro", "Dados inválidos " +
                            e.getMessage()));
        } catch (Exception e) {
            // Retorna erro interno do servidor 500 para qualquer outra exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new CustomResponseDto("erro", "Erro ao processar a requisição " + e.getMessage()));
        }
    }

    @PostMapping("/insert/tbmanutencaotipo")
    public ResponseEntity<ManutencaoTipo> insertTbModelo(@RequestBody ManutencaoTipo manutencaoTipo) {
        ManutencaoTipo manutencaoTipoRet = mmManutencaoTipoService.save(manutencaoTipo);
        return ResponseEntity.ok(manutencaoTipoRet);
    }

    @GetMapping("/modelos/listar")
    public ResponseEntity<List<Modelo>> listarTodosModelos() {
        List<Modelo> modelos = veiculoModeloService.findAll();
        return ResponseEntity.ok(modelos);
    }

    @GetMapping("/status/listar")
    public ResponseEntity<List<VeiculoStatus>> listarTodosStatus() {
        List<VeiculoStatus> estatus = veiculoStatusService.findAll();
        return ResponseEntity.ok(estatus);
    }

    @GetMapping("/search/all/veiculostatus")
    public ResponseEntity<?> getAllVeiculosStatus() {
        List<VeiculoDto> veiculostatus = veiculoService.findAllVeiculoStatus();
        return ResponseEntity.ok(veiculostatus);

    }

    @GetMapping("/search/veiculostatus/status/{idStatus}")
    public ResponseEntity<?> getAllVeiculosIdStatus(@PathVariable Integer idStatus) {
        List<VeiculoDto> veiculostatus = veiculoService.findVeiculoByIdStatus(idStatus);
        return ResponseEntity.ok(veiculostatus);

    }

}
