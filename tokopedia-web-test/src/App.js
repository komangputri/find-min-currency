import React, {Component} from 'react';
import CurrencyInput from 'react-currency-input'
import './index.css'
import './App.css'


class App extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            fractions : [100000, 50000, 20000, 10000, 5000, 1000, 500, 100 ,50],
            result : [],
            left : '',
            error: '',
            val: 0
        }
    }
    doResult = () => {
        const { fractions } = this.state
        let { val } = this.state
        const result = []
        
        if (val !== 0) {
            for (let i = 0; i < fractions.length; i += 1) {
                let count = 0
                while (val >= fractions[i]) {
                    val -= fractions[i]
                    count += 1
                }
                result.push(count)
            }
            // console.log(result);
            this.setState({ 
                result, 
                left: val 
            })
        } else {
            this.setState({
                error: "You need to input something, I guess?",
                left: 0,
                result: []
            })
        }
    }
    handleChange = (event, maskedval, floatval) => {
        this.setState({val: floatval, error: '' })
    }

    handleEnter = e => {
        if (e.key === 'Enter') {
            this.doResult()
          }
    }
    render () {
        const {
            result, fractions, left, val, error
          } = this.state
        return (
            <div className="container">
                <div className="col-8 mx-auto text-center bg-shadow">
                    <h3 className="d-block my-3">Input currency</h3>
                    <CurrencyInput prefix="Rp " ref="myinput" 
                    onKeyDown={this.handleEnter} 
                    value={val} 
                    onChangeEvent={this.handleChange}
                    decimalSeparator=","
                    thousandSeparator="."
                    precision="0" />
                    <button className="btn ml-3" onClick={this.doResult}>Touch Me</button>

                    {result.length > 0
                        && result.map((item, key) => {
                            if (item > 0) {
                                return (
                                    <div className="resultList row mt-2" key={key.toString()}>
                                        <span className="item col-6 border-right">{item}</span> 
                                        <span className="col-1">Rp</span> 
                                        <span className="col-5 text-left">{fractions[key]}</span>
                                    </div>
                                )
                            }
                            return null
                        })
                    }
                    {left > 0 && (
                        <div className="leftTxt row"> 
                            <span className="item col-6 border-right">Left</span> 
                            <span className="col-1">Rp</span> 
                            <span className="col-5 text-left">{left}</span>
                        </div>
                    )}
                    {error !== '' && (
                        <div class="errTxt"> {error} </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App;