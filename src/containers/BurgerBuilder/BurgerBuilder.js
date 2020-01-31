import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
};


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('/ingredients.json').then( (response) => {
            this.setState({
                ingredients: response.data,
                loading: false
            });
            console.log(this.state.ingredients)
        }).catch( e => this.setState({error: e}));

    }

    addIngredient = (type) => {
        const currentIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = currentIngredientCount + 1;
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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max S',
                address: {
                    street: 'xyz',
                    postCode: '1234'
                },
                email: 'abc@xyz.com',
                phone: '1234567890'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then( response => {
                console.log(response)
            })
            .catch( error => console.log( error ))
            .finally( () => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render () {
        const disabledInfo = {};
        for( let key in this.state.ingredients ){
           disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient's couldn't be loaded</p> : <Spinner/>;

        if( this.state.ingredients ) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                continue={this.purchaseContinueHandler}
                cancel={this.purchaseCancelHandler}
                price={this.state.totalPrice}/>;

            burger=(
                <Aux>
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
            );
        }

        if (this.state.loading ) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )

    }
}


export default withErrorHandler(BurgerBuilder, axios);