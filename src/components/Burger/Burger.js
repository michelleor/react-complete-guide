import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


    const ingredientNames = Object.keys(props.ingredients);

    let ingredients = ingredientNames.map( (ingredientName) => {
        return [...Array(props.ingredients[ingredientName])].map( (x, idx) => {
            return <BurgerIngredient type={ingredientName} key={ingredientName + idx}></BurgerIngredient>
        });
    }).reduce( (arr, el) => {
        return arr.concat(el);
    }, []);

    if (ingredients.length === 0 ) {
        ingredients = <p>Please start adding ingredients</p>
    }

    return (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" key="bread-top" />
        {ingredients}
        <BurgerIngredient type="bread-bottom" key="bread-bottom"/>
    </div>

    );
};


export default burger;