import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Produto } from '../../../../pages/produtos/prd_normal.js'
import { ValidarSaldo } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarAlterar } from '../../../../pages/para_pedidos/botoes/avancar/avancar_alterar.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralEntrega } from '../../../../pages/para_pedidos/entrega/geral_entrega.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { AlterarPedido } from '../../../../pages/para_pedidos//para_alterar_pedido.js'


describe('Gerar pedido normal com entrega, entrar alterando, modificar e salvar.', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessoVenda.NFCe()
        EscolherCliente.withRoute()
    })

    context('Com entrega/ processo 9890 - caminho feliz', () => {

        it.skip('1. Gerar pedido com entrega, alterar forma de pagamento. Produto 1860 0 0.', () => {
                      
            Produto.fisrt() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarAlterar.toTransporterAlter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeralEntrega.chooseTransporter()
            AvancarAlterar.installmentDeliveryAlter()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.main()
            EscolherParcelaReceb.two()
            AvancarAlterar.finalAlter()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
            AlterarPedido.okPedGerado()

            AlterarPedido.iconeMenuOpcoesPed() //ALTERAÇÃO PEDIDO WEB
            AlterarPedido.pediPendOpcaoMenuPed() //PEDIDOS PENDENTES
            AlterarPedido.escolherPedPend()
            AlterarPedido.clicarDetalhes()
            AlterarPedido.clicarEditPed()
            AvancarAlterar.toTransporterAlter()
            AvancarAlterar.installmentDeliveryAlter()
            AlterarPedido.removerFormaPag() //ARRASTAR PARA REMOVER FORMA DE PAGAMENTO ANTIGA
            AvancarAlterar.installmentDeliveryAlter()

            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.secondForm()
            EscolherParcelaReceb.one()
            AvancarAlterar.finalAlter()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })
})