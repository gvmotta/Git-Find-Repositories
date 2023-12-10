import {useState} from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button'
import Input from '../../components/Input'
import background from '../../assets/background.png';
import Perfil from '../../components/Perfil';
import Repositorios from '../../components/Repositorios'
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    try { 
      let userData = await fetch(`https://api.github.com/users/${user}`);
      if (userData.status == "404") {
        setUser("gvmotta");
        userData = await fetch(`https://api.github.com/users/${user}`);
      }
      const newUser = await userData.json();
      if(newUser.name){
        const {avatar_url, name, bio, login} = newUser;
        setCurrentUser({avatar_url, name, bio, login})
        const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposData.json();
        console.log(newRepos);
        if(newRepos.length){
          setRepos(newRepos);
        }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation: ' + error.message);
    }
  }
  return (
    <div className="App">
      <Header />
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
              />  
            </>
          ) : null}
          {repos?.length ? (
            <>
            <div className="repositorios">
              <h4>Repositórios</h4>
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
