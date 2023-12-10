import {useState, useEffect} from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button'
import Input from '../../components/Input'
import background from '../../assets/background.png';
import Perfil from '../../components/Perfil';
import Repositorios from '../../components/Repositorios';
import Toast from '../../components/Toast';
import './styles.css';

function App() {
  const [user, setUser] = useState("gvmotta");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [toastMessages, setToastMessages] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastId, setToastId] = useState(0);

  useEffect(() => {
    console.log(user);
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try { 
      let userData = await fetch(`https://api.github.com/users/${user}`);
      const newUser = await userData.json();
      console.log(newUser);
      if(newUser.name){
        const {avatar_url, name, bio, login, html_url} = newUser;
        setCurrentUser({avatar_url, name, bio, login, html_url})
        const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposData.json();
        console.log(newRepos);
        if(newRepos.length){
          setRepos(newRepos);
        }
      } else {
        setToastMessages([...toastMessages, "Usuário não encontrado"]);
        setToastVisible(true);
        setToastId(toastId + 1);
      }
    } catch (error) {
      console.error('Houve um problema com a requisição a API do GitHub: ' + error.message);
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (toastMessages.length > 0) {
      const timer = setTimeout(() => {
        setToastMessages(toastMessages.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessages]);
  return (
    <div className="App">
      <Header />
      {toastMessages.map((message, index) => (
        <Toast key={index} message={message} />
      ))}
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div className="input-container">
            <Input value={user} setUser={setUser}/>
            <Button onClick={handleGetData}/>
          </div>
          {currentUser?.name ? (
            <>
              <Perfil 
                src={currentUser.avatar_url} 
                name={currentUser.name} 
                descr={currentUser.bio} 
                login={currentUser.login}
                link={currentUser.html_url}
              />  
            </>
          ) : null}
          {repos?.length ? (
            <>
            <div className="repositorios">
              <h4>Repositórios Públicos</h4>
              {repos.map((repo, index) => (
                <Repositorios  
                  key={index}
                  title={repo.name} 
                  description={repo.description} 
                  link={repo.html_url}
                />   
              ))}
            </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
