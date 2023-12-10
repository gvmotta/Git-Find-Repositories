import './styles.css';

const Toast = ({message}) => {
    return (
        <div className="toast">
            <div className="logo">
                <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="info-content">
                <h4>Erro</h4>
                <p>{message}</p>
            </div>
        </div>
    )
}
export default Toast;