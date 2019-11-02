import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
};


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    addIngredient = (type) => {
        const currentIngredioutCount = this.state.ingredients[type];
        const updatedIngredientCount = currentIngredioutCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const currentPrice = this.state.totalPrice;
        const newPrice = currentPrice + INGREDIENT_PRICES[type];
        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredient = (type) => {
        const currentIngredioutCount = this.state.ingredients[type];
        if (currentIngredioutCount <= 0 ) return;
        const updatedIngredientCount = currentIngredioutCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        const currentPrice = this.state.totalPrice;
        const newPrice = currentPrice - INGREDIENT_PRICES[type];
        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map( key => ingredients[key])
            .reduce( (sum, value) => sum + value, 0);
        this.setState( { purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('To Do - implement purchasing');
        this.setState({purchasing: false});
    };

    render () {
        const disabledInfo = {};
        for( let key in this.state.ingredients ){
           disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    added={this.addIngredient}
                    removed={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    clicked={this.purchaseHandler}
                />
            </Aux>
        )

    }
}


export default BurgerBuilder