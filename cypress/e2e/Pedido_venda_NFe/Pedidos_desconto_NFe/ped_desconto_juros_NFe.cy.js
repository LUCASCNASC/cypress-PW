import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Produto } from '../../../../pages/produtos/prd_normal.js'
import { ValidarSaldo } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { TirarEntrega } from '../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { PedDesconto } from '../../../../pages/para_pedidos/para_pedido_desconto.js'

describe('Gerar pedido normal com desconto nos juros - parametros 243 e 244 definidos no processo de inclusão', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessoVenda.NFe()
        EscolherCliente.withRoute()
        Produto.roundUpDown() //PRODUTO
        ValidarSaldo.withBalance()
        cy.clickVoltageProduct()
    })

    context('Sem entrega/ processo 9860 - caminho feliz - processo de inclusão 3860', () => {

        it('1. Ped venda: produto 1860 0 0 - arredondar para baixo', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            TirarEntrega.freightFirst() //ENTREGA
            AvancarNormal.toInstallments()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.main()
            EscolherParcelaReceb.one()
            PedDesconto.arrastarFormaPagamento() //DESCONTO
            PedDesconto.clicarAlterarValor()
            PedDesconto.modalAlterarValor()
            PedDesconto.alterarValorParaBaixo()
            AvancarNormal.final()
            FinalizarPed.clickFinishOrder() //RESUMO
            FinalizarPed.validateOrderGenerated()
        })

        it('2. Ped venda: produtos 1860 0 0 - arredondar para cima', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            TirarEntrega.freightFirst() //ENTREGA
            AvancarNormal.toInstallments()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.main()
            EscolherParcelaReceb.one()
            PedDesconto.arrastarFormaPagamento() //DESCONTO
            PedDesconto.clicarAlterarValor()
            PedDesconto.modalAlterarValor()
            PedDesconto.alterarValorParaCima()
            AvancarNormal.final()
            FinalizarPed.clickFinishOrder() //RESUMO
            FinalizarPed.validateOrderGenerated()
        })
    })
})