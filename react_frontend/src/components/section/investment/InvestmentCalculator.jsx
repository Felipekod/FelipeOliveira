import React from 'react'
import Main from '../../template/Main'
import currency from 'currency.js'

const initialState = {
    fields: {startingAmount: 0,
             totalMonths: 0,
             returnRate: 0,
             monthlyContribution: 0},
    table: new Array()
}

//Classe pour le form
export default class SalaireForm extends React.Component {
    constructor(props){
        super(props)
        this.state= {...initialState}

        //bind
        this.handleChange = this.handleChange.bind(this)
        this.printState = this.printState.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.createTable = this.createTable.bind(this)
        this.renderRow = this.renderRow.bind(this)
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

    
    onSubmit(){
        const fields =  {startingAmount: this.state.startingAmount,
            totalMonths: this.state.totalMonths,
            returnRate: this.state.returnRate,
            monthlyContribution: this.state.monthlyContribution}

        this.calculate(fields)

        
    }

    //Do the math to render each row
    calculate(fields){

        const processedFields  = this.processedFields(fields)
        this.createTable(processedFields)


    }

    processedFields(fields){
        const annuallyRate = currency(fields.returnRate).divide(100)
        const table = []
        const firstAmount = currency(fields.startingAmount)
        let startPrincipal = currency(fields.startingAmount)
        let startBalance = currency(fields.startingAmount)
        let firstInterest = currency(this.calculateCompoundInterest(parseFloat(startBalance), annuallyRate))
        let totalInterest = firstInterest
        let endBalance = 0
        let endPrincipal = 0
        let monthlyContribution = currency(fields.monthlyContribution)

        const processedFields = { annuallyRate: annuallyRate,
                                  table: table,
                                  firstAmount: firstAmount,
                                  startPrincipal: startPrincipal,
                                  totalInterest: totalInterest,
                                  endBalance: endBalance,
                                  endPrincipal: endPrincipal,
                                  monthlyContribution: monthlyContribution,
                                  totalMonths: fields.totalMonths}
        return processedFields
    }

    calculateCompoundInterest(p, r, t = 1/12){
        const interest = p * (Math.pow((1 + r / 1), t)) - p;
        return interest;
    }

    createTable(processedFields){

        for (let index = 0; index < processedFields.totalMonths; index++) {
            const lastIndex = index - 1
            if(index !== 0)
            {
                processedFields.startPrincipal = processedFields.firstAmount.add(processedFields.monthlyContribution.multiply(lastIndex))
                processedFields.startBalance = processedFields.startPrincipal.add(processedFields.table[lastIndex].totalInterest)
            }

            let interest = currency(this.calculateCompoundInterest(parseFloat(processedFields.startBalance), processedFields.annuallyRate))

            if(index !== 0)
            processedFields.totalInterest = processedFields.totalInterest.add(interest)

            processedFields.endBalance = processedFields.startBalance.add(processedFields.monthlyContribution).add(interest)
            processedFields.endPrincipal = processedFields.startPrincipal.add(processedFields.monthlyContribution)

            const row = {month: index,
                         startPrincipal: processedFields.startPrincipal.format(), 
                         startBalance: processedFields.startBalance.format(),
                         interest: processedFields.interest.format(),
                         totalInterest: processedFields.totalInterest.format(),
                         endBalance: processedFields.endBalance.format(),
                         endPrincipal: processedFields.endPrincipal.format()}

                        debugger
                         processedFields.table[index] = row     
        }

        // this.setState({table: processedFields.table})
    }


    renderTable(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Start principal</th>
                        <th>Start Balance</th>
                        <th>Interest</th>
                        <th>End balance</th>
                        <th>End principal</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }

    renderRow(){
        return this.state.table.map(row => {
            return(
            <tr key={row.month}>
                <td>{row.month}</td>
                <td>{row.startPrincipal}</td>
                <td>{row.startBalance}</td>
                <td>{row.interest}</td>
                <td>{row.endBalance}</td>
                <td>{row.endPrincipal}</td>
            </tr>
            )
        })
}





    render(){
        return (
            <Main>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Starting amount 2: 
                            <input name='startingAmount' type='text' value={this.state.startingAmount} onChange={this.handleChange} />
                        </label>
                        <label>
                            Total months: 
                            <input name='totalMonths' type='text' value={this.state.totalMonths} onChange={this.handleChange} />
                        </label>
                        <label>
                            Return rate(annually): 
                            <input name='returnRate' type='text' value={this.state.returnRate} onChange={this.handleChange} />
                        </label>
                        <label>
                            Monthly contribution: 
                            <input name='monthlyContribution' type='text' value={this.state.monthlyContribution} onChange={this.handleChange} />
                        </label>
                        <button onClick={this.onSubmit()}>Calculate</button>
                    </form>
                    <hr/>
                    
                    {(this.state.table[0] == 0) ? '' : this.renderTable()}

                </div>
            </Main>
            
            
        )
    }
}

