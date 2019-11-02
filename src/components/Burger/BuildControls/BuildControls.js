import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {

    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map( ingredient => <BuildControl
                key={ingredient.label}
                label={ingredient.label}
                type={ingredient.type}
                added={() => props.added(ingredient.type)}
                removed={() => props.removed(ingredient.type)}
                disable={props.disabled[ingredient.type]}
            /> )}
            <button
                className={classes.OrderButton}
                onClick={props.clicked}
                disabled={!props.purchasable}>Order Now</button>
        </div>
    )
};

export default buildControls;