import './styles.css';
const Input = ({user, setUser}) => {
    return (
        <input name="usuario" placeholder="@username" value={user} onChange={event => setUser(event.target.value)}/>
    )
}
export default Input;