import React, { Component } from 'react';
import api from '../../service/service';
import { Link } from 'react-router-dom';
import './index.css';


export default class Usuarios extends Component {

    state = {
        usuarios: [],
        usuariosInfo: {},
        page: 1
    };
    componentDidMount() {
        this.loadUsuarios();
    }
    loadUsuarios = async (page = 1) => {
        const response = await api.get(`/usuarios?page=${page}`);
        const { docs, ...usuariosInfo } = response.data;
        this.setState({ usuarios: docs, usuariosInfo, page });
    }

    prevPage = ()=>{
        const {page} = this.state;
        if(page===1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }

    nexPage = ()=>{
        const {page, usuariosInfo} = this.state;
        if(page === usuariosInfo.pages) return;

        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }

    render() {
        const { usuarios, usuariosInfo, page } = this.state;
        return (
            
            <div className="usuario-list">
                {this.state.usuarios.map(usuario => (
                    <table>
                    <article key={usuario._id}>
                       <tr>
                           <th>Nome:</th>
                           <td><strong>{usuario.nome}</strong></td>
                        </tr>
                           <tr>
                               <th>Matricula:</th>
                               <td>{usuario.matricula}</td>
                           </tr>
                        
                        <p><Link to={`/usuarios/${usuario._id}`}>Acessar</Link></p>
                    </article>
                    </table>
                ))}

                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button  disabled={page===usuariosInfo.page} onClick={this.nexPage}>Proximo</button>
                </div>



            </div>
        );
    }
}