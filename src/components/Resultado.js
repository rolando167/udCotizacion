import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';
import { useRef } from "react";

const Mensaje = styled.div`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align:center;
`;

const ResultadoCotizacion = styled.div`
     text-align: center;
     padding: .5rem;
     border: 1px solid #26C6DA;
     background-color: rgb(127, 224, 237);
     margin-top: 1rem;
     position: relative;

`;

const TextoCotizacion = styled.p`
    color: #00838F;
    padding: 1rem;
    text-transform: uppercase;
    font-weight:bold;
    margin: 0;
`;

const Resultado = ({cotizacion}) => {
    const nodeRef  = useRef(null);

    return (
        (cotizacion === 0)
            ?<Mensaje>Elije marca, año y tipo!!</Mensaje>
            :(
                <ResultadoCotizacion>
                    <TransitionGroup
                        component="span"
                        className="resultado"
                    >
                        <CSSTransition
                            classNames="resultado"
                            key={cotizacion}
                            timeout={500}
                            nodeRef={nodeRef}
                        >
                            <TextoCotizacion>El total es $ <span ref={nodeRef}>{cotizacion}</span></TextoCotizacion>
                        </CSSTransition>
                    </TransitionGroup>
                </ResultadoCotizacion>

        )
    );
}
Resultado.propTypes = {
	cotizacion: PropTypes.number.isRequired
}
export default Resultado;