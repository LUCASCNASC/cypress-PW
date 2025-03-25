import { EscolherCliente } from '../../../../../pages/para_pedidos/cliente/cliente.js'
import { ValidarSaldo } from '../../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Produto } from '../../../../../pages/produtos/prd_normal.js'
import { Servico } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { RecebimentoPromo } from '../../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { ValidarServico } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { Promocao } from '../../../../../pages/para_pedidos/promocao/promocao.js'
import { TicketPrestamista } from '../../../../../pages/para_pedidos/validar_tela/prestamista.js'

describe('Gerar pedidos com serviço Prestamista Abatimento Valor Fixo (161)', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessoVenda.NFe()
        EscolherCliente.withRoute()
    })   

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento Valor Fixo', () => {

        it('1. Ped venda: produto 1860 0 0, inclusão 3880, prestamista 161 (55,90), 4 parcelas no recebimento Futuro com juros.', () => {
    
            Produto.fisrt() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.futSemJurosPrestAbatValFixo()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado() //Validando adição do prestamista
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('2. Ped venda: produto 1860 0 0 e 1870 0 0, inclusão 3880, prestamista 161 (55,90), 4 parcelas no recebimento Futuro com juros.', () => {
    
            Produto.fisrt() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validarModalServVinc()
            ValidarServico.garantiaNaoSep()
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.second() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.futSemJurosPrestAbatValFixo()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado()
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })

    context('Com entrega / Produtos com promoção - Prestamista com abatimento Valor Fixo', () => {

        it('3. Ped venda: produto 1922 0 0 (promo a prazo 171), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros', () => {
    
            Produto.termFisrtPrestAbatVF() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promocao.selecionarPrimeiraPromoProduto()
            RecebimentoPromo.prazoFutComJurosPrestAbatVF()
            cy.clickAddProduct()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedido.clicarEditarParcelas()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado() //Validando adição do prestamista
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('4. Ped venda: produto 1923 0 0 + garantia Não separa (promo a prazo 172 - isentar juros serviços), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros', () => {

            Produto.termSecondPrestAbatVF() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promocao.selecionarPrimeiraPromoProduto()
            RecebimentoPromo.prazoFutComJurosPrestAbatVF()
            cy.clickAddProduct()
            Servico.validarModalServVinc()
            ValidarServico.garantiaNaoSep()
            Servico.clicarOKServVinc() //SERVIÇOS
            ValidarServico.servVinc() ; ValidarServico.garantiaNaoSep()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedido.clicarEditarParcelas()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado() //Validando adição do prestamista
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('5. Ped venda: produto 1924 0 0 + garantia Não separa (promo a prazo 173 - isentar juros garantia), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros', () => {

            Produto.termThirdPrestAbatVF() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promocao.selecionarPrimeiraPromoProduto()
            RecebimentoPromo.prazoFutComJurosPrestAbatVF()
            cy.clickAddProduct()
            Servico.validarModalServVinc()
            ValidarServico.garantiaNaoSep()
            Servico.clicarOKServVinc() //SERVIÇOS
            ValidarServico.servVinc() ; ValidarServico.garantiaNaoSep()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedido.clicarEditarParcelas()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado() //Validando adição do prestamista
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })

    context('Com entrega / Produto sem promoção - Prestamista com abatimento Valor Fixo', () => {

        it('6. Ped venda: produto 1860 0 0, inclusão 3878, prestamista 161 (55,90), 4 parcelas no recebimento Presente com juros.', () => {
    
            Produto.fisrt() //PRODUTO
            ValidarSaldo.comSaldo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.toTransporter()
            AvancarNormal.toInstallments()
            GeralPagamento.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamento.loadingFormPayment()
            Recebimento.presentePrestAbatValFixo()
            EscolherParcelaReceb.for()
            ValidarServico.okSeguroPrest()
            TicketPrestamista.adicionado() //Validando adição do prestamista
            AvancarNormal.final()
            TicketPrestamista.paginaFinal()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })
})