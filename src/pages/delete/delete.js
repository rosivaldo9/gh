import React, { Component } from 'react';
import './delete.css';
import { Redirect, Link } from 'react-router-dom';
import api from '../../service/service';

class DeleteUsuario extends Component{
    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            redirect: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({ usuario: response.data });
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect />
        } else {
            return (
                <fieldset>
                    <legend>Deletar usuario</legend>
                    <div className="usuario-delete">
                        
                                <label htmlFor="nome">Nome:   </label><span className="nome">{this.state.usuario.nome}</span>
                            
                           
                        
                        
                        <p>Tem certeza que deja deletar esse usuario?</p>
                        <button className="button-delete" onClick={this.handleClick}>Remover</button>
                    </div>
                    <br /><br />

                    <Link className="button-delete" to="/">Voltar</Link>
                </fieldset>
            )
        }
    }


    handleClick = event => {
        const { id } = this.props.match.params;
        fetch(`http://localhost:3003/sistema/usuarios/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true});
                }
            })
        event.preventDefault();
    }
}

export default DeleteUsuario;