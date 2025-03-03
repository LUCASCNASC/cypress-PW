import { garantiaNaoSepara, garantiaSeparaMesmoProcesso, garantiaSeparaTituloProcessoDiferente, maoObraDestacaNãoSepara, 
         maoObraNaoDestacaSeparaMesmoProcesso, maoObraNaoDestacaSeparaProcessoDiferente, validarModalServVinculado, clicarOKServVinculado } from '../../../support/para_pedidos/servicos/apenas_servicos.js';
import { infoFinalClienteSemEntrega, infoFinalClienteComEntrega, infoFinalEntrega, validarObsNotaFiscalVazio, validarObsInternaVazio } from '../../../support/para_pedidos/validar_tela/tela_final.js';
import { ProcessoVenda } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { EscolherCliente } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Produto } from '../../../../pages/produtos/prd_normal.js'
import { GeralProduto } from '../../../../pages/produtos/gerais_pedido.js'
import { ValidarSaldo } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Servico } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AvancarNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinalizarPed } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeralEntrega } from '../../../../pages/para_pedidos/entrega/geral_entrega.js'
import { GeralPagamento } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { EscolherParcelaReceb } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Recebimento } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'

describe('Gerar pedidos com Garantia e Mão de Obra com entrega', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessoVenda.NFCe()
        EscolherCliente.comRota()
        Produto.primeiro() //PRODUTO
        ValidarSaldo.comSaldo()
        GeralProduto.escolherProdutoPesquisa()
        GeralProduto.clicarVoltagemProduto() //PRODUTO
        GeralProduto.clicarAdicionarProduto()
        Servico.validarModalServVinc()
    })

    context('Com entrega/processo 9890 - caminho feliz', () => {

        it('1. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraDestacaNãoSepara() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()  
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('2. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraDestacaNãoSepara() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('3. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('4. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('5. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraNaoDestacaSeparaProcessoDiferente() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega() 
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('6. Ped venda: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaMesmoProcesso() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            maoObraNaoDestacaSeparaProcessoDiferente() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('7. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraDestacaNãoSepara()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega() 
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('8. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraDestacaNãoSepara()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('9. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('10. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega() 
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('11. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraNaoDestacaSeparaProcessoDiferente() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega() 
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('12. Ped venda: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaNaoSepara() //Marcar garantia "T.A. Garantia Não Separa"
            maoObraNaoDestacaSeparaProcessoDiferente() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega() 
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('13. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa)', () => {

            garantiaSeparaTituloProcessoDiferente() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraDestacaNãoSepara() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('14. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaTituloProcessoDiferente() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraDestacaNãoSepara() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('15. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo)', () => {

            garantiaSeparaTituloProcessoDiferente() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('16. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaTituloProcessoDiferente() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraNaoDestacaSeparaMesmoProcesso() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })

        it('17. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo)', () => {

            garantiaSeparaTituloProcessoDiferente //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraNaoDestacaSeparaProcessoDiferente()
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
            GeralPagamento.clicarGerarParcelas() //GERAR PARCELAS
            GeralPagamento.carregandoFormaPagamento() 
            Recebimento.principal()
            EscolherParcelaReceb.duas()
            AvancarNormal.final()
            FinalizarPed.clicarFinalizarPed() //RESUMO
            FinalizarPed.validarPedGerado()
        })  

        it('18. Ped venda: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)', () => {

            garantiaSeparaTituloProcessoDiferente//Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            maoObraNaoDestacaSeparaProcessoDiferente()
            Servico.clicarOKServVinc() //SERVIÇOS
            Produto.segundo() //PRODUTO
            ValidarSaldo.comSaldo()
            GeralProduto.escolherProdutoPesquisa()
            GeralProduto.clicarVoltagemProduto() //PRODUTO
            GeralProduto.clicarAdicionarProduto()
            Servico.validarModalServVinc() //SERVICOS
            Servico.clicarOKServVinc()
            AvancarNormal.paraTransportadora()
            GeralEntrega.modalInconsApenasTransp() //ESCOLHER TRANSPORTADORA
            GeralEntrega.escolherTransportadora()
            AvancarNormal.parcelasEntrega()
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