import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
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
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ userEmail: state.user.email });

export default connect(mapStateToProps)(Wallet);
