import styled from "@emotion/styled";
import {primerMayuscula} from '../helper'
import PropTypes from 'prop-types';

const Contenedor = styled.div`
    padding: 1rem;
    text-align:center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    // extraer de datos
    const {marca, year, plan} = datos;

    if(marca==='' || year==='' || year===''){
        return null;
    }

    return (
        <Contenedor>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)}</li>
                <li>Plan: {primerMayuscula(plan)}</li>
                <li>Año del Auto: {year} </li>
            </ul>
        </Contenedor>

     );
}
Resumen.propTypes = {
	datos: PropTypes.object.isRequired
}
export default Resumen;