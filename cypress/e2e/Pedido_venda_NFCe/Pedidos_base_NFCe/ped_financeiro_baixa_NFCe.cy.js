import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Produto } from '../../../../pages/produtos/prd_normal.js'
import { ValidarSaldo } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralEntrega } from '../../../../pages/para_pedidos/entrega/geral_entrega.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'

describe('Gerar pedido com financeiro na baixa com entrega', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.clearAllSessionStorage();
        cy.login();
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessoVenda.financePaymentNFCe()
        EscolherCliente.withRoute()
        Produto.fisrt() //PRODUTO
        ValidarSaldo.withBalance()
        cy.selectProductSearch()
    })
    
    context('Com entrega/ processo 9892 - caminho feliz', () => {

        it('1. Ped venda: produto 1860 0 0', () => {
                      
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter()
            GeralEntrega.chooseTransporter()
            AvancarNormal.installmentDelivery()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment() 
            Recebimento.main()
            EscolherParcelaReceb.two()
            AvancarNormal.final()
            FinalizarPed.clickFinishOrder() //RESUMO
            FinalizarPed.validateOrderGenerated()
        })

        it('2. Ped venda: produtos 1860 0 0 e 1870 0 0', () => {
                      
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            Produto.second() //SEGUNDO PRODUTO
            ValidarSaldo.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            cy.selectProductSearch()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter() 
            GeralEntrega.modalInconsOnlyTransporter()
            GeralEntrega.chooseTransporter()
            AvancarNormal.installmentDelivery()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment() 
            Recebimento.main()
            EscolherParcelaReceb.two()
            AvancarNormal.final()
            FinalizarPed.clickFinishOrder() //RESUMO
            FinalizarPed.validateOrderGenerated()
        })
    })
})