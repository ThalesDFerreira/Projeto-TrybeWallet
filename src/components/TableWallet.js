import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpensesWallet } from '../actions';

class TableWallet extends React.Component {
  deleteExpense = (element) => {
    const { dadosAtualizados, dados, setId, setTotal } = this.props;
    const elementsUpdated = dados.filter((el) => el.id !== element.id);
    dadosAtualizados(elementsUpdated);
    let maiorId = 0;
    if (elementsUpdated.length > 0) {
      maiorId = elementsUpdated[elementsUpdated.length - 1].id;
      setId(maiorId + 1);
    } else {
      setId(maiorId);
    }
    let total = 0;
    elementsUpdated.forEach((elem) => {
      const { currency } = elem;
      total += (elem.value * elem.exchangeRates[currency].ask);
    });
    setTotal(total);
  };

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
                <td>
                  <button type="button">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(el) }
                  >
                    Deletar
                  </button>

                </td>
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
  dadosAtualizados: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  setTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dados: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  dadosAtualizados: (expenses) => dispatch(updateExpensesWallet(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
