import { Component } from "react";


class InputComponents extends Component {

    render() {
        const {label, ...inputProperties} = this.props 
 
        return (  
            <div className={`${inputProperties.className}`} >
    
                <label>{label}</label>
                <input
                  type={`${inputProperties.type}`}
                  value={inputProperties.value}
                  name={`${inputProperties.name}`}
                  onChange={ e =>  inputProperties.onChange(e)}
                  placeholder={inputProperties.placeholder}
                />
                
            </div>
        );
    }
}
 
export default InputComponents;

