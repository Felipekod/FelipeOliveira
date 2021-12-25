/* eslint no-eval: 0 */

import React, { Component } from 'react'
import './Calculator.css'
import Button from './Button'
import Display from './Display'
import Main from '../../template/Main'
import mathImg from '../../../assets/vector/math.jpg'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0], 
    current: 0
}


export default class Calculator extends Component {

    state = { ...initialState }
    
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    componentDidMount(){
        //Donne mobilité à la calculatrice.
        const item = document.getElementById("calculator-mover-select")
        
        //on recupere la position

        item.onmousemove = e => {
            const calculator = document.getElementById("calculator-mover")

            const item = e.target
            item.style.cursor = 'move'
            
            if (e.buttons){
                //On change la position
                calculator.style.position = 'absolute'
                calculator.style.top = `${e.clientY - (item.clientHeight / 2)}px`
                calculator.style.left = `${e.clientX - (item.clientWidth / 2)}px`

            }
        }
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
            }catch(e){
                values[0] = this.state.values[0]
            }

            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }



    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue: displayValue, clearDisplay: false})

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }

    render() {

        return(
            <Main title="Calculatrice" subtittle="Calculatrice">
                <div className='calculator-container' style={{ backgroundImage: `url(${mathImg})`,
                                                  backgroundPosition: 'center',
                                                  backgroundSize: 'cover',
                                                  backgroundRepeat: 'no-repeat'}}>
                    <div className='calculator-blur-box'>
                        <div id="calculator-mover" className="calculator">
                            <Display value={this.state.displayValue}/>
                            <Button label="AC" click={this.clearMemory} triple/>
                            <Button label="/" click={this.setOperation} operation/>
                            <Button label="7" click={this.addDigit}/>
                            <Button label="8" click={this.addDigit}/>
                            <Button label="9" click={this.addDigit}/>
                            <Button label="*" click={this.setOperation} operation/>
                            <Button label="4" click={this.addDigit}/>
                            <Button label="5" click={this.addDigit}/>
                            <Button label="6" click={this.addDigit}/>
                            <Button label="-" click={this.setOperation} operation/>
                            <Button label="1" click={this.addDigit}/>
                            <Button label="2" click={this.addDigit}/>
                            <Button label="3" click={this.addDigit}/>
                            <Button label="+" click={this.setOperation} operation/>
                            <Button label="0" click={this.addDigit} double/>
                            <Button label="." click={this.addDigit}/>
                            <Button label="=" click={this.setOperation} operation/>
                        </div>
                    </div>

                </div>
            </Main>
        )
    }
}