import './styles.css';
const Perfil = ({src, name, descr, login, link}) => {
    return (
        <div>
            <a href={link} className="perfil">
                <div  className="profile">
                    <img src={src} className="profile-img" alt="foto de perfil" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <span>@{login}</span>
                    <p>{descr}</p>
                </div>
            </a>
        </div>
    )
}
export default Perfil;