import './App.css';
import { Routes, routes } from './routes';
import NavBar from './components/NavBar';

function App() {


  return (
    <div className="App">
      <NavBar links={routes.filter((routeConfig => !!routeConfig.name))} />
      <Routes routes={routes} />
    </div>
  );
}

export default App;
