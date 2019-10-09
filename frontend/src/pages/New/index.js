import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null;
        },[thumbnail]
    );

    async function handleSubmit(e){
        e.preventDefault();
        const user_id = localStorage.getItem('user');
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
      }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})`}} className={thumbnail ? 'has-thumbnail':''}>
                <input type="file" name="thumbnail" id="thumbnail" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione a IMG" />
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                type="text"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                type="text"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">VALOR DA DIARIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                type="text"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
            </form>
        </>
    );
}