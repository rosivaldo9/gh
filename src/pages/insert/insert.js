import React, { Component } from 'react';
import './insert.css';
import { Redirect } from "react-router-dom";

class CriaUsuario extends Component {
    constructor() {
        super();

        this.state = {
            usuario: {
                nome: "",
                matricula: 0,
                ativo: "true",
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuario</legend>
                        <div className="row">
                            <div className="usuario-insert">

                                <div className="col s6">
                                    <label htmlFor="nome">Nome:</label>
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
                            </div>
                            <div className="col s6">
                            <div className="usuario-insert">
                                <label htmlFor="matricula">Matricula:</label>
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
                            </div>
                            <div className="col s6">
                            <div className="usuario-insert">
                                <label htmlFor="cidade">cidade:</label>
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
                            </div>
                            <div className="col s6">
                            <div className="usuario-insert">
                                <label htmlFor="estado">Estado:</label>
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
                            </div>
                            </div>
                            <div className="usuario-insert">
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="true"
                                        checked={this.state.usuario.ativo === "true"}
                                        onChange={this.handleInputChange}
                                    />
                        Ativo
                    </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="false"
                                        checked={this.state.usuario.ativo === "true"}
                                        onChange={this.handleInputChange}
                                    />
                        Inativo
                    </label>
                    </div>
                            


                            <button type="submit">Cadastrar</button>
                       
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
            usuario: { ...prevState.usuario, [name]: value }
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

    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })
        event.preventDefault();
    }


}

export default CriaUsuario;