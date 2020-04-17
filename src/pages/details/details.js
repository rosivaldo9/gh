import React, {Component} from 'react';
import api from '../../service/service';
import {Link} from "react-router-dom";
import './detail.css';


export default class extends Component{
    state={
        usuario: {
            nome: "",
            matricula: 0,
            ativo: "",
            endereco: {
                cidade: "",
                estado: ""
            }
        }

    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({ usuario: response.data});
    }

    render(){
        const {usuario} = this.state;

        if(usuario.ativo){
            usuario.ativo = "Usuario Ativo";
        }else{
            usuario.ativo = "Usuario Inativo"
        }
        return (
          
            <div className="usuario-info">
                <table>
                    <tr>
                    <th><label className="label-usuario">Nome:</label></th>
                    <td><h2 className="usuario">{usuario.nome}</h2></td>
                    </tr>
                    <tr>
                        <th><label className="label-usuario">Matricula:</label></th>
                        <td><h2 className="usuario">{usuario.matricula}</h2></td>
                    </tr>
                    <tr>
                        <th><label className="label-usuario">Status:</label></th>
                        <td><h2 className="usuario">{usuario.ativo}</h2></td>
                    </tr>
                    <tr>
                        <th><label className="label-usuario">Cidade:</label></th>
                        <td><h2 className="usuario"> {usuario.endereco.cidade}</h2></td>
                    </tr>
                    <tr>
                        <th><label className="label-usuario">Estado:</label></th>
                        <td> <h2 className="usuario">{usuario.endereco.estado}</h2></td>
                    </tr>
                    </table>
                
            <table>
                <th><Link className="button-details" to={'/'}>Voltar</Link></th>
                <th><Link className="button-details" to={'/editarUsuario'}>Editar</Link></th>
                <th><Link className="button-details" to={'/DeleteUsuario'}>Deletar</Link></th>
            </table>
            </div>
        )
    }
}