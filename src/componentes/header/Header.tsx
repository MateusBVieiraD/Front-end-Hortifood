import './Header.css'

function Header(){
    return(
        <>
        <header className="header">
                <div className="logo">
                <img src="src\assets\favicon.ico" alt="logo" />
                </div>
            <nav className='navegacao'>
                <h1 className='texto'>Hortifood</h1>
            </nav>
        </header>
        </>
    )
}

export default Header