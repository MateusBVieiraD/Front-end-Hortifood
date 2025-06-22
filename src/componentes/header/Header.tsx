import './Header.css'
import { useNavigate } from 'react-router-dom'



function Header() {
    const navigate = useNavigate();

    return (
        <>
            <header className="header">
                <div
                    className="logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    <img src="src\assets\favicon.ico" alt="logo" />
                </div>
                <nav className='navegacao'>
                    <h1
                        className='texto'
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Hortifood
                    </h1>
                </nav>
            </header>
        </>
    )
}

export default Header