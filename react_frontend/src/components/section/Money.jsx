import React from 'react'
import Main from '../template/Main'
import './Money.css'
import coinsImg from '../../assets/vector/306.jpg'
import * as IoIcons from "react-icons/io"

const secondesAnee = 31557600



//Classe pour recuperer le salaire
class SalaireForm extends React.Component {
    constructor(props){
        super(props)
        this.state= {value: ''}

        //bind
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value})
        //Si la valeur est numerique
        if(!isNaN(this.state.value)){
            this.props.onSalaireChange(event.target.value)
        }
        else{
            this.setState({value: 0})
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Votre salaire: 
                    <input type='text' value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}


//Classe qui renderise un compteur
class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {compteur: 0,
                      muskWage: 0,
                      utilisateurWage: 0,
                      utilisateurWageSec: 0}
        
        //bind necessaire pour le callback
        this.resetTimer = this.resetTimer.bind(this)
        this.start = this.start.bind(this)
        this.handleSalaireChange = this.handleSalaireChange.bind(this)
        this.addTime = this.addTime.bind(this)
    }
    //Methodes Mount et Unmount pour le cicle de view du component
    componentDidMount(){
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
    tick(){
        let newTimer = this.state.compteur + 1
        let newMuskWage = this.state.muskWage + this.muskGo();
        let newUtilisateurWage = this.state.utilisateurWage + this.state.utilisateurWageSec
        this.setState({compteur: newTimer,
                        muskWage: newMuskWage,
                        utilisateurWage: newUtilisateurWage})
    }
    resetTimer(){
        this.setState(() => ({
            compteur: 0,
            muskWage: 0,
            utilisateurWage: 0,
            utilisateurWageSec: 0
        }))
        clearInterval(this.timer)
    }
    start(){
        clearInterval(this.timer)
        this.timer = setInterval(
            ()=> this.tick(),
            1000)
    }
    addTime(){
        const newCompteur =  this.state.compteur
        //TODO

        
        console.log(newCompteur)
        //this.setState()
    }

    //Calcule la taux / seconde d'Helon Musk
    muskGo(){
        const muskSalaire = 126400000000
        const muskSalaireSec = muskSalaire / secondesAnee
        return muskSalaireSec
    }

    handleSalaireChange(salaire){
        this.resetTimer()
        const newSalaire = salaire / secondesAnee
        this.setState(() => ({
            utilisateurWageSec: newSalaire
        }))
    }

    //number formatter.
    currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    render(){
        return ( 
            <div className='container-timer'>
                <SalaireForm onSalaireChange={this.handleSalaireChange} />
                <div className='container-timer-secs'>
                    <h3><IoIcons.IoMdTime /></h3> <h3>{this.state.compteur}</h3>
                </div>
                <ul className='container-timer-liste'>
                    <li>
                        <h3>Vous</h3>
                        <h3>{this.currencyFormat(this.state.utilisateurWage)}</h3>
                    </li>
                    <li>
                        <h3>Musk</h3>
                        <h3>{this.currencyFormat(this.state.muskWage)}</h3>
                    </li>
                </ul>
                
                <button id="btn-musk-stop" className="btn btn-danger ml-1 btn-musk" onClick={this.resetTimer}>Stop</button>
                
                <button id="btn-musk-start" className="btn btn-success  ml-1 btn-musk"  onClick={this.start}>START</button>
                <button id="btn-musk-add" className="btn btn-success  ml-1 btn-musk"  onClick={this.addTime}>+1m</button>

            </div>
        )
    }
}


const Money = () => 
    <Main icon="home" title="Exercices 1" subtittle="Portifolio">
        <div className='container-money' style={{ backgroundImage: `url(${coinsImg})`,
                                                  backgroundPosition: 'center',
                                                  backgroundSize: 'cover',
                                                  backgroundRepeat: 'repeat'}}>
            <div className='card-money'>
                <h2>Money!</h2>
                <div id='card-money-inside'>
                    <p>Il y en a 31.557.600 secondes dans 1 année. Savez vous combien d'argent vous faites par seconde?<br/>
                    
                    <br/>Si vous divise votre salaire pour la quantité de secondes dans une année on peut calculer combiens d'argent tu gagnes à chaque seconde.<br/>
                    
                    <br/>Comparé avec Elon Musk qui a augmenté sa fortune en 126.4 milliards dans une année!</p>
                    <hr/>
                    <Timer />
                </div>
            </div>
        </div>
    </Main>

export default Money


