import './styles.css';
const repositorio = ({title, description, link}) => {
    return (
        <div className="itemsList">
            <a href={link}>{title}</a>
            <p>{description}</p>
            <hr />
        </div>
    )
}
export default repositorio;