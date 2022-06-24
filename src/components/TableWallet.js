import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableWallet extends React.Component {
  render() {
    const { dados } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((el) => {
            const { currency } = el;
            return (
              <tr key={ el.id }>
                <td>{ el.id }</td>
                <td>{ el.description }</td>
                <td>{ el.tag }</td>
                <td>{ el.method }</td>
                <td>{ Number(el.value).toFixed(2) }</td>
                <td>Real</td>
                <td>{ Number(el.exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (el.value * el.exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ el.exchangeRates[currency].name }</td>
                <td>edit</td>
              </tr>);
          })}

        </tbody>
      </table>
    );
  }
}

TableWallet.propTypes = {
  dados: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  dados: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableWallet);
