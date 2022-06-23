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
    const { userEmail } = this.props;
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
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  walletCurrencies: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ userEmail: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  walletCurrencies: (currencies) => dispatch(infoWallet(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
