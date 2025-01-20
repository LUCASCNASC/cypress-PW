import { saldodisponivel, clienteComRota, clicarAdicionarProduto, escolherProdutoPesquisa,  escolherVoltagemProduto,
         trocarFilialFaturamento, semSaldodisponivel, composicaoDesteKit, saldoCDDisponivel } from '../../../support/para_pedidos/gerais_pedidos.js';
import { produtoNormalPrimeiroNCFe, produtoNormalSegundoNCFe, produtoRemotoComCDNCFe, produtoRemotoSemCDNCFe, produtoKitRemotoNCFe } from '../../../support/para_pedidos_NFCe/apenasNFCe_produtos_pedidos.js';
import { botaoGerarParcelas, escolherFormaPagamentoPrincipal, carregandoFormaPagamento, escolherDuasParcelaPagamento } from '../../../support/para_pedidos/apenas_formas_pagamento.js';
import { modalServicosVinculados, okServicosVinculados } from '../../../support/para_pedidos/apenas_servicos.js';
import { botaoFinalizarPedido, finalizandoPedido, pedidoGerado, } from '../../../support/para_pedidos/apenas_finalizar_pedido.js';
import { processoVendaNFCe } from '../../../support/para_pedidos/apenas_processos_venda.js';
import { avancarFinal, avancarParaTransportadora, avancarParcelasEntrega } from '../../../support/para_pedidos/apenas_botoes_avancar.js';
import { escolherTransportadora, escolherRota, modalInconsApenasRota, modalInconsApenasTransp } from '../../../support/para_pedidos/apenas_entrega.js';
import { pegarAPICidade, esperarAPICidade } from '../../../support/para_pedidos/apenas_APIs.js';

describe('Remoto/processo 9890 - Regra de saldo Parâmetro 36 = 4 - Parâmetro 139 = 4 - Trial 653 não configurado', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        processoVendaNFCe()
        clienteComRota()
        cy.wait(500)
    })
  
    context('Pedido de venda remoto normal', () => {

        it('1-Pedido de venda remota: produto 1860 0 0 - (Venda remota de produto com saldo na filial do faturamento )', () => {

            produtoNormalPrimeiroNCFe() //PRODUTO
            saldodisponivel()
            escolherProdutoPesquisa()
            cy.wait(200)
            escolherVoltagemProduto()
            cy.wait(400)
            trocarFilialFaturamento()
            clicarAdicionarProduto()
            cy.wait(500)
            modalServicosVinculados() //SERVIÇOS
            okServicosVinculados()
            cy.wait(400)
            pegarAPICidade()
            avancarParaTransportadora()
            cy.wait(6000)
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            esperarAPICidade()
            escolherTransportadora()
            avancarParcelasEntrega()
            botaoGerarParcelas() //GERAR PARCELAS
            carregandoFormaPagamento()
            cy.wait(3000)
            escolherFormaPagamentoPrincipal()
            cy.wait(3000)
            escolherDuasParcelaPagamento()
            cy.wait(400)
            avancarFinal()
            botaoFinalizarPedido() //RESUMO
            finalizandoPedido()
            cy.wait(7000)
            pedidoGerado()
        })

        it('2-Pedido de venda remota: produtos 1860 0 0 e 1870 0 0', () => {

            produtoNormalPrimeiroNCFe() //PRODUTO
            saldodisponivel()
            escolherProdutoPesquisa()
            cy.wait(200) 
            escolherVoltagemProduto()
            cy.wait(400)
            trocarFilialFaturamento()
            clicarAdicionarProduto()
            cy.wait(500)
            modalServicosVinculados() //SERVIÇOS
            okServicosVinculados()
            cy.wait(800)
            produtoNormalSegundoNCFe() //SEGUNDO PRODUTO
            saldodisponivel()
            escolherProdutoPesquisa()
            escolherVoltagemProduto()
            cy.wait(800)
            trocarFilialFaturamento()
            clicarAdicionarProduto()
            cy.wait(1000)
            modalServicosVinculados() //SERVIÇOS - SEGUNDO PRODUTO
            okServicosVinculados()
            cy.wait(400)
            pegarAPICidade()
            avancarParaTransportadora()
            cy.wait(6000)
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            esperarAPICidade()
            escolherTransportadora()
            avancarParcelasEntrega()
            cy.wait(6000)
            botaoGerarParcelas() //GERAR PARCELAS
            carregandoFormaPagamento()
            cy.wait(3000)
            escolherFormaPagamentoPrincipal()
            escolherDuasParcelaPagamento()
            cy.wait(400)
            avancarFinal()
            cy.wait(18000)
            botaoFinalizarPedido() //RESUMO
            finalizandoPedido()
            cy.wait(7000)
            pedidoGerado()
        })
        
        it('3-Pedido de venda remota: kit 1877 0 0', () => {

            produtoKitRemotoNCFe() //PRODUTO
            saldoCDDisponivel()
            escolherProdutoPesquisa()
            cy.wait(200)
            escolherVoltagemProduto()
            cy.wait(400)
            trocarFilialFaturamento()
            composicaoDesteKit()
            clicarAdicionarProduto()
            cy.wait(500)
            modalServicosVinculados() //SERVIÇOS
            okServicosVinculados()
            cy.wait(400)
            pegarAPICidade()
            avancarParaTransportadora()
            cy.wait(6000)
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            esperarAPICidade()
            escolherTransportadora()
            avancarParcelasEntrega()
            cy.wait(7000)
            botaoGerarParcelas() //GERAR PARCELAS
            carregandoFormaPagamento()
            cy.wait(3000)
            escolherFormaPagamentoPrincipal()
            escolherDuasParcelaPagamento()
            cy.wait(400)
            avancarFinal()
            cy.wait(9000)
            botaoFinalizarPedido() //RESUMO
            finalizandoPedido()
            cy.wait(7000)
            pedidoGerado()
        })
    })
    
    context('Pedido de venda remoto sem saldo remoto, pegar CD', () => {

        it('4-Pedido de venda remoto - com saldo no CD (filial 1) - deve permitir fazer o pedido - (Venda remota de produto sem saldo na filial do faturamento, mas com saldo no CD do faturamento - com entrega)', () => {

            produtoRemotoComCDNCFe() //PRODUTO
            semSaldodisponivel()
            escolherProdutoPesquisa()
            cy.wait(200)
            escolherVoltagemProduto()
            cy.wait(400)
            trocarFilialFaturamento()
            clicarAdicionarProduto()
            cy.wait(500)
            modalServicosVinculados() //SERVIÇOS
            okServicosVinculados()
            cy.wait(400)
            pegarAPICidade()
            avancarParaTransportadora()
            cy.wait(6000)
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            esperarAPICidade()
            escolherTransportadora()
            avancarParcelasEntrega()
            cy.wait(6000)
            botaoGerarParcelas() //GERAR PARCELAS
            carregandoFormaPagamento()
            cy.wait(3000)
            escolherFormaPagamentoPrincipal()
            escolherDuasParcelaPagamento()
            cy.wait(400)
            avancarFinal()
            cy.wait(6000)
            botaoFinalizarPedido() //RESUMO
            finalizandoPedido()
            cy.wait(7000)
            pedidoGerado()
        })    
        
        it('5-Pedido de venda remoto - SEM saldo no CD (filial 1) - NÃO deve permitir fazer o pedido - (Venda remota de produto sem saldo na filial do faturamento, sem saldo da CD do faturamento)', () => {

            produtoRemotoSemCDNCFe() //PRODUTO
            semSaldodisponivel()
            escolherProdutoPesquisa()
            cy.wait(200)
            escolherVoltagemProduto()
            cy.wait(400)
            trocarFilialFaturamento()

            //Validando mensagem "Este produto não possui saldo na filial selecionada."
            cy.get('[ng-if="semSaldoCD"][style=""] > p')
                .should('exist')
                .and('be.visible')
                .and('have.text','Este produto não possui saldo na filial selecionada.')
                .invoke('css', 'color') // Obtém a cor do elemento
                .should('equal', 'rgb(244, 67, 54)')

            //Validando mensagem "Este produto não possui saldo na filial selecionada, será permitido apenas a simulação da venda."
            cy.get('[ng-show="(itemGradeSelecionado && itemGradeSelecionado.valor > 0)"] > :nth-child(1) > .mensagem-erro-centralizada > p')
                .should('exist')
                .and('be.visible')
                .and('have.text','Este produto não possui saldo na filial selecionada, será permitido apenas a simulação da venda.')
                .invoke('css', 'color') // Obtém a cor do elemento
                .should('equal', 'rgb(244, 67, 54)')

            //Validando botão Adicionar para Simulação
            cy.get('.md-primary.btn-rounded.md-raised.btn-block')
                .should('exist')
                .and('not.be.disabled')
                .and('contain',' Adicionar para Simulação')
        })    
    })
})