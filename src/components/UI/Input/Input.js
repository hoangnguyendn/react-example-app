import React from 'react';
import classCSS from './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClassCSS = [classCSS.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClassCSS.push(classCSS.Invalid);
    }

    switch (props.inputtype) {
        case ('input'): {
            inputElement = <input className={inputClassCSS.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  placeholder={props.placeholder}
                                  onChange={props.change}
                                  />;
            break;
        }
        case ('textarea'): {
            inputElement = <textarea className={inputClassCSS.join(' ')}
                                     {...props.elementConfig}
                                     value={props.value}
                                     placeholder={props.placeholder}
                                     onChange={props.change}
                                     />;
            break;
        }
        case ('select'): {
            inputElement = <select className={inputClassCSS.join(' ')}
                                   {...props.elementConfig}
                                   onChange={props.change}>
                {props.options.map(option => {
                    return <option key={option.value} value={option.value}>
                        {option.display}
                    </option>
                })}
            </select>;
            break;
        }
        default: {
            inputElement = <input className={inputClassCSS.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  placeholder={props.placeholder}
                                  onChange={props.change}/>
        }
    }

    return (
        <div className={classCSS.Input}>
            <label className={classCSS.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;