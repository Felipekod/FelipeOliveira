import React, {Component} from 'react'
import Main from '../template/Main'
import './CrudSpringBoot.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import currency from 'currency.js'

const baseUrl = '/api/products'
const initialState = {
    product: {id: '', name: '', price: '', discount: ''},
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
        const {product} = this.state

        const requestOptions = {
            method: (product.id) ? 'PUT' : 'POST',
            body: JSON.stringify({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                discount: parseFloat(product.discount)
            }),
            ...config
        };

        fetch(baseUrl, requestOptions)
        //On mettre à jour la page
        window.location.reload(false)
        
    }

    renderLi(){
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{currency(product.price).format()}</td>
                    <td>{product.discount}</td>
                    <td>
                        <button  id="btn-editer" className="btn btn-primary" onClick={() => this.load(product)}>Éditer</button>
                        <button id="btn-effacer" className="btn btn-danger ml-2" onClick={() => this.remove(product.id)}>Effacer</button>
                    </td>
                </tr>
            )
        })
    }
    updateField(event){ //Methode pour mettre à jour le champs du form
        const product = {...this.state.product} //On clone l'utilisateur du state
        product[event.target.name] = event.target.value // On utiliste le nom de l'input pour chercher la propriété du 'state'
        this.setState({product}) 
    }

    clear() {
        this.setState({product: initialState.product})
    }

    load(product){
        this.setState( {product} )
    }


    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" 
                                    className="form-control" 
                                    name="name" 
                                    value={this.state.product.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Voulez saisir le nom..."></input>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" 
                                    className="form-control"
                                    name="price"
                                    value={this.state.product.price}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Voulez saisir le prix">
                            </input>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Discount</label>
                            <input type="text" 
                                    className="form-control" 
                                    name="discount" 
                                    value={this.state.product.discount}
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