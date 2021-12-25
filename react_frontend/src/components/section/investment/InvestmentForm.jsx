import React from 'react'

//Classe pour le form
export default class SalaireForm extends React.Component {
    constructor(props){
        super(props)
        this.state= {startingAmount: '', totalMonths: '', returnRate: '', monthlyContribution: ''}

        //bind
        this.handleChange = this.handleChange.bind(this)
        this.printState = this.printState.bind(this)
        this.sendFields = this.sendFields.bind(this)
    }

    handleChange(event){
        //Si la valeur est numerique
        if(!isNaN(event.target.value)){
            this.setState({[event.target.name]: event.target.value})
        }
        else{
            this.setState({[event.target.name]: ''})
        }
    }
    //Print test console.log
    printState(){
        console.log('STATE = '+ this.state.monthlyContribution)
    }

    //On envoie les champs pour calculer
    sendFields(e){
        e.preventDefault()
        const fields =  {startingAmount: this.state.startingAmount,
                         totalMonths: this.state.totalMonths,
                         returnRate: this.state.returnRate,
                         monthlyContribution: this.state.monthlyContribution}

        console.log(fields)
        this.props.click(fields)
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>
                            Starting amount: 
                            <input class="form-control" name='startingAmount' type='text' value={this.state.startingAmount} onChange={this.handleChange} />
                            </label>
                            <label className='form-investment-input'>
                                Total months: 
                                <input class="form-control" name='totalMonths' type='text' value={this.state.totalMonths} onChange={this.handleChange} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div>
                            <label>
                                Return rate: 
                                <input class="form-control" name='returnRate' type='text' value={this.state.returnRate} onChange={this.handleChange} />
                                <small >Annually</small>
                            </label>
                            <label className='form-investment-input'>
                                Monthly contribution: 
                                <input class="form-control" name='monthlyContribution' type='text' value={this.state.monthlyContribution} onChange={this.handleChange} />
                                <small style={{"color": "#ffff"}}>.</small>
                            </label>
                        </div>
                    </div>
                </div>
                <button id='btn-calculate' class="btn btn-primary mt-3" onClick={this.sendFields}>Calculate</button>
            </form>
        )
    }
}

