

import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback, setiduser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultado, setResultado] = useState('');
    const [texto11, setTexto11] = useState(''); // Necesitas inicializar este estado
    
    const navigate = useNavigate();

    const registra = () => {
        navigate('/registro');
    };

    const registraadmin = () => {
        navigate('/RegistroAdmin');
    };

    const restablecerPassword = () => {
        navigate('/restablecer');
    };

    const validateUser = async (event) => {
        event.preventDefault();
      
        try {
            const res = await fetch('https://back-ganalocoparcial2.vercel.app/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseData = await res.json();
            setResultado(responseData);

            const { usuario, id } = responseData;

            if (usuario === 'user') {
                setiduser(id);
                callback('user');
                navigate('/userHome');
            } else if (usuario === 'admin') {
                callback('admin');
                navigate('/adminHome');
            } else if (responseData === 'usuario o contaseña invalida') {
                setTexto11(responseData);
            }
        } catch (error) {
            console.error('Error al validar el usuario:', error);
            setTexto11('Error en la conexión');
        }
    };

    return (
        <form id="form1" onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido al portal de premios gana loco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br></br>
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br></br>
            <h6 id="texto">{texto11}</h6>
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" onClick={registra}>Registrate</button>
            <button type="button" onClick={registraadmin}>Registrar un Administrador</button>
            
        </form>
    );
}

export default Form;

