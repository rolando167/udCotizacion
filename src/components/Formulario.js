import styled from "@emotion/styled";
import { useState } from "react";
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper'
import PropTypes from 'prop-types';

const Campo = styled.div`
	display: flex;
	margin-bottom: 1rem;
	align-items: center;
`;

const Label = styled.label`
	flex: 0 0 100px;

`;

const Select = styled.select`
	display: block;
	width: 100%;
	padding: 1rem;
	border: 1px solid #e1e1ee;
	-webkit-appearance: none;
`;

const InputRadio = styled.input`
	margin: 0 1rem;
`;

const Boton = styled.button`
	background-color: #00838F;
	font-size: 16px;
	width: 100%;
	padding: 1rem;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	border: none;
	transition: background-color .3s ease;
	margin-top: 2rem;

	&:hover{ /* mas estilo SASS */
		cursor: pointer;
		background-color: #26C6DA;
	}
`;


const Error = styled.div`
	background-color: red;
	color: white;
	padding: 1rem;
	width: 100%;
	text-align: center;
	margin-bottom: 2rem;
`;

const Formulario = ({setResumen, setCargando}) => {

	const [datos, setDatos] = useState({
		marca: '',
		year: '',
		plan: ''
	});

	const [error, setError] = useState(false);

	// extraer los valores
	const {marca, year, plan} = datos;

	// Leer los datos del formulario y colocarlos en el state
	const obtenerInformacion = (e) =>{
		setDatos({
			...datos,
			[e.target.name] : e.target.value
		})
	}

	const cotizarSeguro = (e) =>{
		e.preventDefault();
		if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
			setError(true);
			return;
		}
		setError(false);

		// una base de 2000
		let resultado = 2000;

		//Obtener la diferencia de años
		const diferencia = obtenerDiferenciaYear(year);

		// por cada año hay que restar 3%
		resultado -= (( diferencia * 3) *resultado) / 100;

		//Ameria 15%, asitico 5%, europeo 30%
		resultado = calcularMarca(marca) * resultado;

		//basico aumenta 20%
		//completo 50%
		resultado =  parseFloat(obtenerPlan(plan) * resultado).toFixed(2);

		setCargando(true);

		setTimeout(() => {
			//elimina el spinner
			setCargando(false);

			//pasa la informcion al componenete principal
			setResumen({
				cotizacion: Number(resultado),
				datos
			})
		}, 3000);
	}

	return (
		<form onSubmit={cotizarSeguro}>
			{error ? <Error> Completar Campos</Error> : null}
			<Campo>
				<Label htmlFor="">Marca</Label>
				<Select
					name="marca"
					value={marca}
					onChange={obtenerInformacion}
				>
					<option value="">--seleccione--</option>
					<option value="americano">Americano</option>
					<option value="europeo">Europeo</option>
					<option value="asiatico">Asiatico</option>
				</Select>
			</Campo>

			<Campo>
				<Label htmlFor="">Año</Label>
				<Select
					name="year"
					value={year}
					onChange={obtenerInformacion}

					>
					<option value="">-- Seleccione --</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
				</Select>
			</Campo>
			<Campo>
				<Label>Plan</Label>
				<InputRadio type="radio" name="plan"
				checked={plan === "basico"}
				onChange={obtenerInformacion}
				value="basico" />Básico

				<InputRadio type="radio" name="plan"
				checked={plan === "completo"}
				onChange={obtenerInformacion}

				value="completo" />Completo

			</Campo>
			<Boton type="submit">Cotizar</Boton>
		</form>
	);
}
Formulario.propTypes = {
	setResumen: PropTypes.func.isRequired,
	setCargando: PropTypes.func.isRequired,
}

export default Formulario;