import React from 'react'
import Main from '../template/Main'

//RUN NPM START

function formatName(user){
    return user.firstName + ' ' + user.lastName
}

const user = {
    firstName: 'Felipe',
    lastName: 'Oliveira'
}

function Welcome(props){
    return <h3>Hello, {props.name}</h3>
}
//Function pour le submit (evenement) 
function handleSubmit(e){
    e.preventDefault()
    console.log("U did it")
}
//Formate la date pour l'horloge ci-dessous
function FormattedDate(props){
    return <h3>It's {props.date.toLocaleTimeString()}.</h3>
}

//Classe qui renderise un element horloge.
class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {date: new Date()}
    }
    //Methodes Mount et Unmount pour le cicle de view du component
    componentDidMount(){
        this.timerID = setInterval(
            ()=> this.tick(),
            1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({date: new Date()})
    }

    render() {
        return <FormattedDate date={this.state.date} /> //<h3>It's {this.state.date.toLocaleTimeString()}.</h3>
    }
}


//Classe qui renderise un compteur
class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {compteur: 0}
        
        //bind necessaire pour le callback
        this.resetTimer = this.resetTimer.bind(this)
        this.ajouterDix = this.ajouterDix.bind(this)
        this.ajouterMusk = this.ajouterMusk.bind(this)
    }
    //Methodes Mount et Unmount pour le cicle de view du component
    componentDidMount(){
        this.timer = setInterval(
            ()=> this.tick(),
            1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    tick(){
        let newTimer = this.state.compteur + 1
        this.setState({compteur: newTimer})
    }
    resetTimer(){
        this.setState(() => ({
            compteur: 0
        }))
    }
    ajouterDix(){
        let newTimer = this.state.compteur + 10
        this.setState(() => ({
            compteur: newTimer
        }))
    }
    ajouterMusk(){
        let newTimer = this.state.compteur + 300000000000 
        this.setState(() => ({
            compteur: newTimer
        }))
    }
    
    render(){
        return ( 
            <div>
                <h3>{this.state.compteur}</h3>
                <button className="btn btn-primary ml-1" onClick={this.resetTimer}>Reseter compteur</button>
                <button className="btn btn-secondary ml-1"  onClick={this.ajouterDix}>Ajouter dix</button>
                <button className="btn btn-secondary ml-1"  onClick={this.ajouterMusk}>Elon Musk!</button>
            </div>
        )
    }
}


const Time = () => 
    <Main icon="home" title="Exercices 1" subtittle="Portifolio">
        <div className='display-4'>Timer State!</div>
        <hr/>
        <p className="mb-0">Format name: {formatName(user)}</p>
        <hr/>
        <Welcome name="Rick"/>
        <Welcome name="Morty"/>
        <hr/>
        <h2>React.component class avec state</h2>
        <Clock />
        <hr/>
        <form onSubmit={handleSubmit}><button type="submit">Send console.log</button></form>
        <hr/>
        <Timer />
    </Main>

export default Time




