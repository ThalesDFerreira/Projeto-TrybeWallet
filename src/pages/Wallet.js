import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { infoWallet } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const { walletCurrencies } = this.props;
    const responses = fetch(url)
      .then((resp) => resp.json())
      .then((json) => walletCurrencies(
        Object.keys(json).filter((el) => el !== 'USDT'),
      ));
    return responses;
  }

  render() {
    const { userEmail, getWalletCurrencies } = this.props;
    return (
      <div>
        <header>
          <div>
            Usuário:
            {' '}
            <span data-testid="email-field">{ userEmail }</span>
          </div>
          <div>
            Total:
            {' '}
            <span data-testid="total-field">{0}</span>
          </div>
          <div>
            Câmbio:
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <form>
          <label htmlFor="despesas">
            Despesas:
            {' '}
            <input data-testid="value-input" type="number" id="despesas" />
          </label>
          <label htmlFor="descricao">
            Descrição:
            {' '}
            <input data-testid="description-input" type="text" id="descricao" />
          </label>
          <label htmlFor="Moeda">
            Moeda:
            {' '}
            <select id="Moeda">
              {getWalletCurrencies.map((el) => <option key={ el }>{ el }</option>)}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de Pagamento:
            {' '}
            <select data-testid="method-input" id="pagamento">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categ">
            Categoria de Despesas:
            {' '}
            <select data-testid="tag-input" id="categ">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  walletCurrencies: PropTypes.func.isRequired,
  getWalletCurrencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  getWalletCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  walletCurrencies: (currencies) => dispatch(infoWallet(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
