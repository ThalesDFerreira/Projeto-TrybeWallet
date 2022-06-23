import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { infoUser } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    button: true,
  };

  onInputChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, () => this.buttonDisableEnable());
  };

  // Retirado do site https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  buttonDisableEnable = () => {
    const { password, email } = this.state;
    const limitNumber = 6;
    const verifyEmail = /\S+@\S+\.\S+/;
    if (password.length >= limitNumber && verifyEmail.test(email) === true) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, userLogin } = this.props;
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { button } = this.state;
    return (
      <div data-testid="page-login">
        <h3>Login</h3>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ this.onInputChange }
            placeholder="E-mail"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.onInputChange }
            placeholder="Senha"
          />
          <button
            type="button"
            name="button"
            onClick={ this.handleSubmit }
            disabled={ button }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(infoUser(email)),
});

// const mapStateToProps = (state) => ({
//   personal: state.personalReducer,
//   professional: state.professionalReducer,
// });

export default connect(null, mapDispatchToProps)(Login);
