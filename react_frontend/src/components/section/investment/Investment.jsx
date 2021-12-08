import React from 'react'
import Main from '../../template/Main'
import InvestmentForm from './InvestmentForm'
import currency from 'currency.js'
import './Investment.css'

//Classe pour le form
export default class tableInvestment extends React.Component {
    constructor(props){
        super(props)
        this.state = {table: []}

        this.getFields = this.getFields.bind(this)
        this.calculate = this.calculate.bind(this)
        this.renderRow = this.renderRow.bind(this)
        this.renderTable = this.renderTable.bind(this)

    }

    getFields(fields){
        this.calculate(fields)
    }

    calculate(fields){
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


        for (let index = 0; index < fields.totalMonths; index++) {
            const lastIndex = index - 1
            if(index !== 0)
            {
                startPrincipal = firstAmount.add(monthlyContribution.multiply(lastIndex + 1))
                startBalance = startPrincipal.add(table[lastIndex].totalInterest)
            }

            let interest = currency(this.calculateCompoundInterest(parseFloat(startBalance), annuallyRate))

            if(index !== 0)
                totalInterest = totalInterest.add(interest)

            endBalance = startBalance.add(monthlyContribution).add(interest)
            endPrincipal = startPrincipal.add(monthlyContribution)

            const row = {month: index + 1,
                         startPrincipal: startPrincipal.format(), 
                         startBalance: startBalance.format(),
                         interest: interest.format(),
                         totalInterest: totalInterest.format(),
                         endBalance: endBalance.format(),
                         endPrincipal: endPrincipal.format()}

            
            table[index] = row   
            
        }

        this.setState({table: table})
    }

    calculateCompoundInterest(p, r, t = 1/12){
        const interest = p * (Math.pow((1 + r / 1), t)) - p;
        return interest;
    }


    renderTable(){
        const lastIndexCalculated = this.state.table.length - 1
        return(
            <div className='calculated-investment'>
                <div>
                    <h2>End balance: {this.state.table[lastIndexCalculated].endBalance}</h2>
                </div>
                <table className='table table-sm  table-striped table-hover'>
                    <thead className='thead-dark'>
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
            </div>

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

    monthlyRate(annuallyRate){
        return annuallyRate  / 12
    }


    render(){
        return (
        <Main>
            <div className='display-4 text-center'>Investment calculator</div>
            <hr/>
            <InvestmentForm  click={this.getFields}/>
            <hr/>
            {(this.state.table[1]) ? this.renderTable() : ''}
        </Main>
        )
    }
}



