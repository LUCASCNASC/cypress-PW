import { clicarCarrinhoCompras, botaoAvancarPedido, produtoServicoAvulso, escolherServicoPesquisa, messItemAdicionadoSucesso, servicoAdicionadoCarrinho, clicarGerarParcelas } from '../../../support/para_pedidos/servicos/apenas_servicos.js';
import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'

describe('Venda de serviço avulso', () => {

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

        it('1. Venda de Mão de obra - 144 (T.A. MO Não Destaca e Separa Processo Diferente)', () => {

            produtoServicoAvulso() //PRODUTO
            escolherServicoPesquisa()
            messItemAdicionadoSucesso()
            clicarCarrinhoCompras() //CARRINHO COMPRAS
            servicoAdicionadoCarrinho()
            botaoAvancarPedido()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento()
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })
    })
})