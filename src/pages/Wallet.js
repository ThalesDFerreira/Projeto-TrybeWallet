import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesWallet, expensesWallet } from '../actions';
import TableWallet from '../components/TableWallet';

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTACAO,
    description: '',
    exchangeRates: {},
    total: 0,
    button: true,
  }

  componentDidMount() {
    this.fetchApiCurrencies();
  }

  fetchApiCurrencies = () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const { walletCurrencies } = this.props;
    const responses = fetch(url)
      .then((resp) => resp.json())
      .then((json) => walletCurrencies(
        Object.keys(json).filter((el) => el !== 'USDT'),
      ));
    return responses;
  }

  fetchApiAllCurrencies = () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const responses = fetch(url)
      .then((resp) => resp.json())
      .then((json) => this.setState({ exchangeRates: json }));
    return responses;
  }

  onInputChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, () => this.buttonDisableEnable());
  };

  buttonDisableEnable = () => {
    const { value, description } = this.state;
    if (value !== 0 && description !== '') {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  saveExpenses = async (event) => {
    event.preventDefault();
    await this.fetchApiAllCurrencies();
    const {
      id, value, currency, method, tag, description, exchangeRates } = this.state;
    const newExpenses = {
      id, value, currency, method, tag, description, exchangeRates };
    const { walletExpenses } = this.props;
    await walletExpenses(newExpenses);
    const { getWalletExpenses } = this.props;
    const quantidadeExpenses = getWalletExpenses.length;
    this.setState({ id: quantidadeExpenses });
    this.sumValue();
    this.cleanInputs();
  }

  cleanInputs = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
      button: true,
    });
  }

  sumValue = async () => {
    const { getWalletExpenses } = this.props;
    const valorDosElementos = getWalletExpenses.map((element) => {
      const { currency } = element;
      return ((element.value)
      * (element.exchangeRates[currency].ask));
    });
    const somaTotalElementos = valorDosElementos.reduce((crr, acc) => (
      ((crr) + (acc))));
    this.setState({ total: somaTotalElementos.toFixed(2) });
  }

  render() {
    const { userEmail, getWalletCurrencies } = this.props;
    const { button, total, value, currency, method, tag, description } = this.state;
    return (
      <div>
        <header>
          <div>
            Usuário:
            {' '}
            <span data-testid="email-field">{ userEmail }</span>
          </div>
          <div>
            Total: R$
            {' '}
            <span
              data-testid="total-field"
            >
              { total }
            </span>
          </div>
          <div>
            Câmbio:
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <form>
          <label htmlFor="value">
            Despesas:
            {' '}
            <input
              name="value"
              data-testid="value-input"
              type="number"
              id="value"
              value={ value }
              onChange={ this.onInputChange }
              placeholder="0"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              name="description"
              data-testid="description-input"
              type="text"
              id="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="Moeda">
            Moeda:
            {' '}
            <select
              id="Moeda"
              name="currency"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {getWalletCurrencies
                .map((el) => (
                  <option key={ el }>
                    { el }
                  </option>))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de Pagamento:
            {' '}
            <select
              data-testid="method-input"
              id="pagamento"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categ">
            Categoria de Despesas:
            {' '}
            <select
              name="tag"
              data-testid="tag-input"
              id="categ"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.saveExpenses }
            disabled={ button }
          >
            Adicionar despesa
          </button>
        </form>
        <TableWallet />
      </div>
    );
  }
}

Wallet.propTypes = {
  walletExpenses: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  walletCurrencies: PropTypes.func.isRequired,
  getWalletCurrencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  getWalletExpenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  getWalletCurrencies: state.wallet.currencies,
  getWalletExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletCurrencies: (currencies) => dispatch(currenciesWallet(currencies)),
  walletExpenses: (expenses) => dispatch(expensesWallet(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
