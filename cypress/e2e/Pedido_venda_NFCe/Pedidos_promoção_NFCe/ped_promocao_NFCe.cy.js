import { validarComSaldo, clienteComRota, escolherProdutoPesquisa, clicarVoltagemProduto, clicarAdicionarProduto, selecionarPrimeiraPromoProduto,
         ticketPromocao } from '../../../support/para_pedidos/gerais_pedidos.js'
import { produtoPromoPartida, produtoPromoPrazoEntrada, produtoPromoPrazoParcelado } from '../../../support/produtos_pedidos/prd_normal.js';
import { clicarGerarParcelas, carregandoFormaPagamento, escolherDuasParcelaPagamento, clicarGerarPagamento } from '../../../support/para_pedidos/apenas_formas_pagamento.js';
import { escolherFormaPagamentoPrincipal } from '../../../support/para_pedidos/processos/processo_recebimento.js';
import { validarModalServVinculado, clicarOKServVinculado } from '../../../support/para_pedidos/servicos/apenas_servicos.js';
import { clicarFinalizarPedido, validarPedidoGerado } from '../../../support/para_pedidos/apenas_finalizar_pedido.js';
import { processoVendaNFCe } from '../../../support/para_pedidos/processos/processo_venda.js';
import { escolherRecebPromoPagPrincipal } from '../../../support/para_pedidos/processos/processo_recebimento_promo.js';
import { avancarFinal, avancarParaTransportadora, avancarParcelasEntrega } from '../../../support/para_pedidos/apenas_botoes_avancar.js';
import { escolherTransportadora, modalInconsApenasTransp } from '../../../support/para_pedidos/apenas_entrega.js';
import { infoFinalClienteSemEntrega, infoFinalClienteComEntrega, infoFinalEntrega, validarObsNotaFiscalVazio, validarObsInternaVazio } from '../../../support/para_pedidos/validar_tela/tela_final.js';

describe('Gerar pedidos com promoção com entrega', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        processoVendaNFCe()
        clienteComRota()
    })

    context('Com entrega /com promoção/ processo 9890 - caminho feliz', () => {

        //verificar 
        it.skip('1. Ped venda com promoção partida (promoção 152): produto 1868 0 0', () => {
    
            produtoPromoPartida() //PRODUTO
            validarComSaldo()
            escolherProdutoPesquisa() ; ticketPromocao() 
            clicarVoltagemProduto()
            selecionarPrimeiraPromoProduto()
            escolherRecebPromoPagPrincipal()
            clicarAdicionarProduto()
            validarModalServVinculado() //SERVICOS
            clicarOKServVinculado()
            avancarParaTransportadora()
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            escolherTransportadora()
            avancarParcelasEntrega()
            clicarGerarParcelas() //GERAR PARCELAS

            //Escolher "Forma de pagamento"
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click()
            cy.wait(4000)
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click()

            avancarFinal()
            clicarFinalizarPedido() //RESUMO
            validarPedidoGerado()
        })
    
        //verificar 
        it.skip('2. Ped venda com promoção a prazo com entrada (promoção 150): produto 1866 0 0', () => {
    
            produtoPromoPrazoEntrada() //PRODUTO
            validarComSaldo()
            escolherProdutoPesquisa() ; ticketPromocao() 
            clicarVoltagemProduto()
            selecionarPrimeiraPromoProduto() //PROMOÇÃO
            escolherRecebPromoPagPrincipal()
            clicarAdicionarProduto()
            validarModalServVinculado() //SERVICOS
            clicarOKServVinculado()
            avancarParaTransportadora()
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            escolherTransportadora()
            avancarParcelasEntrega()
            cy.wait(6000)

            //"GERAR PAGAMENTO"
            cy.get('.layout-wrap > .md-primary').scrollTo('top').wait(200)
            cy.contains('.md-select-value', 'Forma de pagamento').click()
            // cy.get('.white > :nth-child(3)').click({force:true})
            // cy.contains('3861 - T.A. A Receber A Vista').click({force:true})
            // clicarGerarPagamento()

            // clicarGerarParcelas() //GERAR PARCELAS
            // carregandoFormaPagamento()
            // cy.wait(3000)
            // escolherFormaPagamentoPrincipal()
            // escolherDuasParcelaPagamento()
            // avancarFinal()
            // clicarFinalizarPedido() //RESUMO
            // validarPedidoGerado()
        })

        //verificar 
        it.skip('3. Ped venda com promoção a prazo parcelado (promoção 151): produto 1867 0 0', () => {
    
            produtoPromoPrazoParcelado() //PRODUTO
            validarComSaldo()
            escolherProdutoPesquisa() ; ticketPromocao()
            clicarVoltagemProduto()
            selecionarPrimeiraPromoProduto() //PROMOÇÃO
            escolherRecebPromoPagPrincipal()
            clicarAdicionarProduto()
            validarModalServVinculado() //SERVICOS
            clicarOKServVinculado()
            avancarParaTransportadora()
            modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            escolherTransportadora()
            avancarParcelasEntrega()
            clicarGerarParcelas() //GERAR PARCELAS

            //Escolher a forma de pagamento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force:true})
            cy.wait(3000)
            //Escolher a forma de pagamento/parcelas
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})
            avancarFinal()
            clicarFinalizarPedido() //RESUMO
            validarPedidoGerado()
        })  
    })
})