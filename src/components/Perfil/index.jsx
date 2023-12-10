import './styles.css';
const Perfil = ({src, name, descr, login}) => {
    return (
        <div className="perfil">
            <img src={src} className="profile" alt="foto de perfil" />
            <div>
                <h3>{name}</h3>
                <span>{login}</span>
                <p>{descr}</p>
            </div>
        </div>
    )
}
export default Perfil;