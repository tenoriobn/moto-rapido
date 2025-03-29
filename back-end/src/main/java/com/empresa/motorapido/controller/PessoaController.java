package com.empresa.motorapido.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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

import com.empresa.motorapido.dto.PessoaDto;
import com.empresa.motorapido.model.Cargo;
import com.empresa.motorapido.model.Pessoa;
import com.empresa.motorapido.service.CargoService;
import com.empresa.motorapido.service.PessoaService;

@RestController
@RequestMapping("api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private ControllerValidator controllerValidator;

    @Autowired
    private CargoService cargoService;

    @GetMapping("search/idpessoa/{id}")
    public ResponseEntity<PessoaDto> findByPessoaIdPessoa(@PathVariable Long id) {
        return pessoaService.findByPessoaIdPessoa(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("search/cpf/{cpf}")
    public ResponseEntity<Pessoa> findByCpf(@PathVariable String cpf) {
        return pessoaService.findByCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("search/nome/like/{nome}")
    public ResponseEntity<?> findPessoaInfoByNome(@PathVariable String nome) {
        if (controllerValidator.isNullOrEmpty(nome)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Informe algum valor");
        }
        if (nome.length() < 3) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<PessoaDto> pessoasdto = pessoaService.findPessoaInfoByNome(nome);

        if (pessoasdto.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(pessoasdto); // Retorna 200 OK com a lista
        }
    }

    @GetMapping("search/mecanico/like/{nome}")
    public ResponseEntity<?> findPessoaInfoByMecanicoNome(@PathVariable String nome) {
        if (controllerValidator.isNullOrEmpty(nome)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Informe algum valor");
        }
        if (nome.length() < 3) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<PessoaDto> pessoasdto = pessoaService.findPessoaInfoByMecanicoNome(nome);

        if (pessoasdto.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(pessoasdto); // Retorna 200 OK com a lista
        }
    }

    @GetMapping("search/cpf/like/{cpf}")
    public ResponseEntity<?> findPessoaInfoByCpf(@PathVariable String cpf) {
        if (controllerValidator.isNullOrEmpty(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Informe algum valor");
        }
        if (cpf.length() < 3) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<PessoaDto> pessoasdto = pessoaService.findPessoaInfoByCpf(cpf);

        if (pessoasdto.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(pessoasdto); // Retorna 200 OK com a lista
        }
    }

    @GetMapping("search")
    public ResponseEntity<List<Pessoa>> findAll() {
        List<Pessoa> pessoas = pessoaService.findAll();
        return ResponseEntity.ok(pessoas);
    }

    @PostMapping("/insert/cargo")
    public ResponseEntity<?> insertTbModelo(@RequestBody Cargo cargo) {
        Cargo cargoInstr = cargoService.save(cargo);
        return ResponseEntity.ok(cargoInstr);
    }

    @GetMapping("/search/cargo")
    public ResponseEntity<List<Cargo>> findAllCargo() {
        List<Cargo> cargo = cargoService.findAll();
        return ResponseEntity.ok(cargo);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody PessoaDto pessoaDto) {
        try {
            if (controllerValidator.isNullOrEmpty(pessoaDto.getNome()) ||
                    controllerValidator.isNullOrEmpty(pessoaDto.getCpf()) ||
                    controllerValidator.isNullOrEmpty(pessoaDto.getRg())) {
                return ResponseEntity.badRequest().body("Rg, CPF e nome são obrigatórios");
            }
            pessoaService.savePessoaDto(pessoaDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody PessoaDto pessoaDto) {
        if (!controllerValidator.isNumeric(pessoaDto.getIdPessoa())) {
            return ResponseEntity.badRequest().body(null);
        }
        if (!pessoaService.findById(pessoaDto.getIdPessoa()).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        try {
            pessoaService.update(pessoaDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(""); // retorna o objeto atualizado 201
            // return ResponseEntity.noContent().build(); //realizada com sucesso, mas não
            // há conteúdo adicional 204
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!controllerValidator.isNumeric(id)) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            pessoaService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
