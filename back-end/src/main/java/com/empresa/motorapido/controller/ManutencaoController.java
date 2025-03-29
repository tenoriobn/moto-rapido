package com.empresa.motorapido.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.motorapido.dto.CustomResponseDto;
import com.empresa.motorapido.dto.ManutencaoCorretivaDto;
import com.empresa.motorapido.dto.ManutencaoProgramadaDto;
import com.empresa.motorapido.service.ManutencaoCorretivaService;
import com.empresa.motorapido.service.ManutencaoProgramadaService;

@RestController
@RequestMapping("/api/manutencao")
public class ManutencaoController {
    @Autowired
    private ManutencaoProgramadaService manutencaoProgramadaService;
    @Autowired
    private ControllerValidator controllerValidator;

    @Autowired
    private ManutencaoCorretivaService manutencaoCorretivaService;

    @GetMapping("/programada/search/modelo/{nomeModeloVeiculo}")
    public ResponseEntity<?> getModeloManutencaoProgramada(@PathVariable String nomeModeloVeiculo) {
        List<ManutencaoProgramadaDto> listaVeiculoManut = manutencaoProgramadaService
                .findByManutencaoLikeModelo(nomeModeloVeiculo);
        if (listaVeiculoManut.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculoManut);
        }
    }

    @GetMapping("/programada/search/placa/{nomePlacaVeiculo}")
    public ResponseEntity<?> getPlacaManutencaoProgramada(@PathVariable String nomePlacaVeiculo) {
        List<ManutencaoProgramadaDto> listaVeiculoManut = manutencaoProgramadaService
                .findByManutencaoLikePlaca(nomePlacaVeiculo);
        if (listaVeiculoManut.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculoManut);
        }
    }

    @GetMapping("/programada/search/idveiculo/{idVeiculo}")
    public ResponseEntity<?> getIdVeiculoManutencaoProgramada(@PathVariable Long idVeiculo) {
        List<ManutencaoProgramadaDto> listaVeiculoManut = manutencaoProgramadaService
                .findByManutencaoIdVeiculo(idVeiculo);
        if (listaVeiculoManut.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculoManut);
        }
    }

    @PostMapping("/programada/cadastrar")
    public ResponseEntity<?> inserirManutencaoProgramada(@RequestBody ManutencaoProgramadaDto manutencaoProgramadaDto) {
        try {

            manutencaoProgramadaService.save(manutencaoProgramadaDto);
            // Retorna resposta de sucesso com status 201 Created
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new CustomResponseDto("success", " Programação inserido com sucesso."));

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

    @PutMapping("/programada/atualizar")
    public ResponseEntity<?> atualizarManutencaoProgrmada(
            @RequestBody ManutencaoProgramadaDto manutencaoProgramadaDto) {
        try {

            manutencaoProgramadaService.atualizarManutencao(manutencaoProgramadaDto);

            return ResponseEntity.ok(new CustomResponseDto("success", "Veiculo " +
                    manutencaoProgramadaDto.getPlaca() + " atualizado com sucesso.")); // retona o objeto atualizado

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

    @PutMapping("/programada/baixar")
    public ResponseEntity<?> baixarManutencaoProgrmada(@RequestBody ManutencaoProgramadaDto manutencaoProgramadaDto) {
        try {
            if (controllerValidator.isNullOrEmpty(manutencaoProgramadaDto.getDataFeitoManutencao())
                    || controllerValidator.isNullOrEmpty(manutencaoProgramadaDto.getKmFeitoManutencao())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new CustomResponseDto("erro", "Data e km devem ser informados. "));

            } else {
                manutencaoProgramadaService.baixarManutencao(manutencaoProgramadaDto);

                return ResponseEntity.ok(new CustomResponseDto("success",
                        "Manutenção baixada com sucesso."));
            }

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

    @PostMapping("/corretiva/cadastrar")
    public ResponseEntity<?> inserirManutencaoCorretiva(@RequestBody ManutencaoCorretivaDto manutencaoCorretivaDto) {
        try {

            manutencaoCorretivaService.save(manutencaoCorretivaDto);
            // Retorna resposta de sucesso com status 201 Created
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new CustomResponseDto("success", " Manutenção inserido com sucesso."));

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

    @GetMapping("/corretiva/search/idveiculo/{idVeiculo}")
    public ResponseEntity<?> getIdVeiculoManutencaoCorretiva(@PathVariable Long idVeiculo) {
        List<ManutencaoCorretivaDto> listaVeiculoManut = manutencaoCorretivaService
                .findByManutencaoByIdVeiculo(idVeiculo);
        if (listaVeiculoManut.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(listaVeiculoManut);
        }
    }

    @PutMapping("/corretiva/baixar")
    public ResponseEntity<?> baixarManutencaoProgrmada(@RequestBody ManutencaoCorretivaDto manutencaoCorretivaDto) {
        try {
            if (controllerValidator.isNullOrEmpty(
                    manutencaoCorretivaDto.getDataFeitoManutencao())
                    || !controllerValidator.isNumeric(manutencaoCorretivaDto.getId())
                    || !controllerValidator.isNumeric(manutencaoCorretivaDto.getIdVeiculo())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new CustomResponseDto("erro", "Data e id manutenção e IdVeiculo devem ser informados. "));

            } else {
                manutencaoCorretivaService.baixarManutencaoCorretiva(manutencaoCorretivaDto);

                return ResponseEntity.ok(new CustomResponseDto("success",
                        "Manutenção baixada com sucesso."));
            }

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

    // Relatorios
    @GetMapping("/programada/search/idveiculo/periodo/{idVeiculo}/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> getManutencaoProgramadaPorIdVeiculoPeriodo(
            @PathVariable Long idVeiculo,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal) {
        List<ManutencaoProgramadaDto> manutencoes = manutencaoProgramadaService
                .findByManutencaoProgIdVeiculoPeriodo(idVeiculo, dataInicial, dataFinal);
        return ResponseEntity.ok(manutencoes);
    }

    // Endpoint para findByManutencaoProgPeriodo com parâmetros no caminho
    @GetMapping("/programada/search/periodo/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> getManutencaoProgramadaPorPeriodo(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal) {
        List<ManutencaoProgramadaDto> manutencoes = manutencaoProgramadaService
                .findByManutencaoProgPeriodo(dataInicial, dataFinal);
        return ResponseEntity.ok(manutencoes);
    }

    @GetMapping("/corretiva/search/idveiculo/periodo/{idVeiculo}/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> getManutencaoCorretivaPorIdVeiculoPeriodo(
            @PathVariable Long idVeiculo,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal) {
        List<ManutencaoCorretivaDto> manutencoes = manutencaoCorretivaService
                .findByManutencaoCoretByIdVeiculoAndPeriodo(idVeiculo, dataInicial, dataFinal);
        return ResponseEntity.ok(manutencoes);
    }

    // Endpoint para findByManutencaoCoretVeiculoPeriodo com parâmetros no caminho
    @GetMapping("/corretiva/search/periodo/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> getManutencaoCorretivaPorPeriodo(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal) {
        List<ManutencaoCorretivaDto> manutencoes = manutencaoCorretivaService
                .findByManutencaoCoretVeiculoPeriodo(dataInicial, dataFinal);
        return ResponseEntity.ok(manutencoes);
    }

}
