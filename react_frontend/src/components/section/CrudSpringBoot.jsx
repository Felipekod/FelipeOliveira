import React, {Component} from 'react'
import Main from '../template/Main'
import './CrudSpringBoot.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import currency from 'currency.js'

const baseUrl = '/api/products'
const initialState = {
    produit: {id: '', nom: '', prix: '', rabais: ''},
    list: []
}
const config = {mode: 'cors', // no-cors, *cors, same-origin
credentials: 'same-origin', // include, *same-origin, omit
headers: { 
    "Accept": 'application/json',
    "Content-Type": "application/json; charset=UTF-8"
 }}


class Produits extends Component {
    state = {...initialState}

    async componentDidMount(){
        const response = await fetch(baseUrl, config);
        const body = await response.json();
        this.setState({list: body});
    }

    //mettre à jours la table
    async refreshTable(){
        const response = await fetch(baseUrl, config);
        const body = await response.json();
        this.setState({list: body});
    }

    //Function que DELETE un produit puis mets à jour la liste.
    async remove(id) { 
        await fetch(`${baseUrl}/${id}`, {
          method: 'DELETE',
          ...config
        }).then(() => {
          let updatedList = [...this.state.list].filter(i => i.id !== id);
          this.setState({list: updatedList});
        });
    }
    //Function PUT / POST
    async save() {
        const {produit} = this.state

        const requestOptions = {
            method: (produit.id) ? 'PUT' : 'POST',
            body: JSON.stringify({
                id: produit.id,
                nom: produit.nom,
                prix: parseFloat(produit.prix),
                rabais: parseFloat(produit.rabais)
            }),
            ...config
        };

        fetch(baseUrl, requestOptions)
        //On mettre à jour la page
        window.location.reload(false)
        
    }

    renderLi(){
        return this.state.list.map(produit => {
            return (
                <tr key={produit.id}>
                    <td>{produit.id}</td>
                    <td>{produit.nom}</td>
                    <td>{currency(produit.prix).format()}</td>
                    <td>{produit.rabais}</td>
                    <td>
                        <button  id="btn-editer" className="btn btn-primary" onClick={() => this.load(produit)}>Éditer</button>
                        <button id="btn-effacer" className="btn btn-danger ml-2" onClick={() => this.remove(produit.id)}>Effacer</button>
                    </td>
                </tr>
            )
        })
    }
    updateField(event){ //Methode pour mettre à jour le champs du form
        const produit = {...this.state.produit} //On clone l'utilisateur du state
        produit[event.target.name] = event.target.value // On utiliste le nom de l'input pour chercher la propriété du 'state'
        this.setState({produit}) 
    }

    clear() {
        this.setState({produit: initialState.produit})
    }

    load(produit){
        this.setState( {produit} )
    }


    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" 
                                    className="form-control" 
                                    name="nom" 
                                    value={this.state.produit.nom}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Voulez saisir le nom..."></input>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prix</label>
                            <input type="text" 
                                    className="form-control"
                                    name="prix"
                                    value={this.state.produit.prix}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Voulez saisir le prix">
                            </input>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rabais</label>
                            <input type="text" 
                                    className="form-control" 
                                    name="rabais" 
                                    value={this.state.produit.rabais}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Voulez saisir le rabais(%) entre 0 et 1..."></input>
                        </div>
                    </div>
                    <div className="row">
                    <div id="div-btn" className="col-12 d-flex justify-content-end">
                        <button id="btn-enregistrer" className="btn btn-primary"
                                onClick={e => this.save(e)}>Enregistrer</button>
                        <button id="btn-annuler" className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}> Annuler</button>
                    </div>
                </div>
                </div>


            </div>
        )
    }

    render(){
        return (
            <div>
                {this.renderForm()}
                <table className="table table-sm  table-striped">
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Rabais</th>
                        <th>Action</th>
                    </tr>
                     {this.renderLi()}
                </table>
            </div>
        )
    }
}

const CrudSpringBoot = () => 
    <Main icon="home" title="Exercices 4" subtittle="Portifolio">
        <div>
            <h2>Liste de produits - Backend en Java Spring Boot</h2>
        </div>
        <Produits/>
    </Main>

export default CrudSpringBoot