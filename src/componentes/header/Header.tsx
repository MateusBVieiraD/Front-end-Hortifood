import './Header.css'

function Header(){
    return(
        <>
        <header className="header">
                <div className="logo">
                <img src="src\assets\favicon.ico" alt="logo" />
                </div>
            <nav className='navegacao'>
                <ul>
                    <li><a href="">Loja</a></li>
                    <li><a href="">Entregador</a></li>
                    <li><a href="">Cliente</a></li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header