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
import { Servico } from '../../../../pages/para_pedidos/servicos/apenas_servicos.js'

describe('Gerar pedidos com Garantia e Mão de Obra com entrega', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessoVenda.NFCe()
        EscolherCliente.withRoute()
        Produto.fisrt() //PRODUTO
        ValidarSaldo.withBalance()
        cy.selectProductSearch()
        cy.clickVoltageProduct()
        cy.clickAddProduct()
        Servico.validateModalServLinked()
    })

    context('Com entrega/processo 9890 - caminho feliz', () => {

        it('1. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraDestNãoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('2. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraDestNãoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('3. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('4. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('5. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraNaoDestSepaProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('6. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Servico.maoObraNaoDestSepaProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('7. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraDestNãoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('8. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraDestNãoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('9. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('10. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('11. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraNaoDestSepaProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('12. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaNaoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Servico.maoObraNaoDestSepaProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('13. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa)', () => {

            Servico.garantiaSepTituloProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraDestNãoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('14. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepTituloProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraDestNãoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('15. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo)', () => {

            Servico.garantiaSepTituloProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('16. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepTituloProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraNaoDestSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('17. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo)', () => {

            Servico.garantiaSepTituloProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraNaoDestSepaProcDif()
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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

        it('18. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            Servico.garantiaSepTituloProcDif()//Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Servico.maoObraNaoDestSepaProcDif()
            Servico.clickOKServiceLinked() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validateModalServLinked() //SERVICOS
            Servico.clickOKServiceLinked()
            AvancarNormal.toTransporter()
            GeralEntrega.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
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