import { clienteComRota, clicarServicosMenu, clicarCarrinhoCompras, botaoAvancarPedido, produtoServicoHost,
         escolherServicoPesquisa, escolherValorRecarga } from '../../../support/para_pedidos/servicos/apenas_servicos.js';
import { iconeMenuOpcoes } from '../../../support/para_menus/para_menu_opcoes.js';
import { clicarGerarParcelas, carregandoFormaPagamento, escolherUmaParcelaPagamento } from '../../../support/para_pedidos/parcelas_pedido.js';
import { escolherFormaPagamentoPrincipal } from '../../../support/para_pedidos/processos/processo_recebimento.js';
import { clicarFinalizarPedido, validarPedidoGerado } from '../../../support/para_pedidos/apenas_finalizar_pedido.js';
import { processoVendaServicoAvulso } from '../../../support/para_pedidos/processos/processo_venda.js';
import { avancarFinal } from '../../../support/para_pedidos/apenas_botoes_avancar.js';

//Para este cenário, é necessário fazer update na coluna dataultimaatualizacao, da tabela glb.servicofaixavalorfixo
describe('Venda de serviço avulso Host - 104', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        processoVendaServicoAvulso()
        clienteComRota()
    })

    context('Processo 9888 - caminho feliz', () => {

        it.skip('1. Venda de Mão de obra - 144 (T.A. MO Não Destaca e Separa Processo Diferente)', () => {

            iconeMenuOpcoes()
            clicarServicosMenu()
            cy.wait(400)
            produtoServicoHost() //PRODUTO
            escolherServicoPesquisa()
            cy.wait(200)
            escolherValorRecarga()
            cy.wait(200)
            clicarCarrinhoCompras() //CARRINHO COMPRAS
            botaoAvancarPedido()
            cy.wait(3000)
            clicarGerarParcelas() //GERAR PARCELAS
            carregandoFormaPagamento()
            escolherFormaPagamentoPrincipal()
            escolherUmaParcelaPagamento()
            cy.wait(400)
            avancarFinal()
            clicarFinalizarPedido() //RESUMO
            validarPedidoGerado()
        })
    })
})