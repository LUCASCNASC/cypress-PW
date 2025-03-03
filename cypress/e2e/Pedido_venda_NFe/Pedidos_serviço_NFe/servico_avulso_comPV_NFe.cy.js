import { iconeMenuOpcoes, clienteCompletoOpcaoMenu, clicarMenuClienteCompleto, clicarOpcaoServicos, clicarCarrinhoCompras, botaoAvancarPedido,
         aguardeCarregandoServico, botaoAddMaoObra, botaoAddGarantias, clicarAddGarantias, modalGarantiasServicosVinculados,
         messServicoAdicionadoSucesso, botaoSalvarServico, messAguardeCarregando, messRegistroSalvoSucesso, messGarantiaJaAdicionada } from '../../../support/para_pedidos/para_servicos_avulsos.js';
import { garantiaSeparaMesmoProcesso, clicarOKServVinculado } from '../../../support/para_pedidos/servicos/apenas_servicos.js';
import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'

describe('Venda de serviço avulso, com pedido do produto já baixado', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessoVenda.vendaServicoAvulso()
        EscolherCliente.comRota()
    })

    context('Processo 9888 - caminho feliz', () => {

        it.skip('1. Venda de garantia - 139 (T.A. Garantia Separa Mesmo Processo)', () => {

            const numero_pedido = '8605'
            
            iconeMenuOpcoes()
            clienteCompletoOpcaoMenu()
            clicarMenuClienteCompleto()
            clicarOpcaoServicos()
            aguardeCarregandoServico()

            //Validando campo
            cy.get('form.ng-pristine > .ng-pristine')
                .should('exist')
                .and('be.visible')
                .and('have.text', '')

            //Inserindo número do pedido no campo 
            cy.get('form.ng-pristine > .ng-pristine')
                .type(numero_pedido, {force:true})

            //Validando número do pedido
            cy.get('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > h3 > .ng-binding')
                .should('have.text', numero_pedido)

            botaoAddMaoObra()
            botaoAddGarantias()
            clicarAddGarantias()
            modalGarantiasServicosVinculados()
            garantiaSeparaMesmoProcesso() //clicar na primeira garantia - Garantia Separa Mesmo Processo
            Servico.clicarOKServVinc()()
            messServicoAdicionadoSucesso()
            botaoSalvarServico()
            messAguardeCarregando()
            messRegistroSalvoSucesso()
            clicarAddGarantias() //Clicando novamente para validar que não deixa adicionar mais garantias
            messGarantiaJaAdicionada() //Mensagem de "O Serviço Garantias já foi adicionado à esse produto.", quando tentamos adicionar novamente
            clicarCarrinhoCompras()
            botaoAvancarPedido()
            cy.wait(3000)
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento()
            Recebimento.principal()
            cy.wait(2000)
            EscolherParcelaReceb.duas()
            cy.wait(400)
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })
})