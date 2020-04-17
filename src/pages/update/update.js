import React, { Component } from 'react';
import './update.css';
import { Redirect } from "react-router-dom";
import api from '../../service/service';

class EditarUsuario extends Component{
    constructor(props){
        super(props);


        this.state = {
            usuario: {
                nome: "",
                matricula: 0,
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        }
    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({usuario: response.data});
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Usuario</legend>
                        <div className="usuario-update">
                            <label htmlFor="nome">Nome</label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Ensirar seu nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-update">
                            <label htmlFor="matricula">Matricula</label>
                            <br />
                            <input
                                type="number"
                                id="matricula"
                                name="matricula"
                                placeholder="Ensirara sau matricula"
                                min="1"
                                max="9999"
                                required
                                value={this.state.usuario.matricula}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="cidade">cidade</label>
                            <br />
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                placeholder="Ensirara saucidade"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.endereco.cidade}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div className="usuario-update">
                            <label htmlFor="estado">Estado</label>
                            <br />
                            <input
                                type="text"
                                id="estado"
                                name="estado"
                                placeholder="Ensirara seu estado"
                                minLength="2"
                                maxLength="2"
                                required
                                value={this.state.usuario.endereco.estado}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>


                        <button type="submit">Editar</button>

                    </fieldset>
                </form>
            )
        }
    }
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: {...prevState.usuario, [name]: value }
        }));

    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const usuario = { ...prevState.usuario };
            usuario.endereco[name] = value;
            return { usuario }
        })
    };

    handleSubmit = event =>{
        const {id} = this.props.match.params;
        fetch(`http://localhost:3003/sistema/usuarios/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type":"application/json"
            }
            
        })
        .then(data=> {
            if(data.ok){
                this.setState({redirect: true});
            }
        })
        event.preventDefault();
    }



}

export default EditarUsuario;