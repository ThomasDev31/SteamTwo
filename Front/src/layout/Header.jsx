import { Link } from "react-router";

function Header({onSearch}) {
    function handleChange(e){
        e.preventDefault()
        console.log(e.target.value)
    }
    return (
        <>
            <header>
                <Link to="/" ><img src="" alt="Logo" /></Link>
                <form action="">
                    <div>
                        <input type="text" onChange={handleChange}/>
                        <i className="fa-solid fa-magnifying-glass" ></i>
                    </div>
                </form>
            </header>
        </>
    );
}

export default Header;