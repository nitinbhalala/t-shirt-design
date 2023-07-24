import './App.css';
import Body from './tshirt/components/Body';
import Login from './tshirt/components/login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './tshirt/components/Firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {!user ? <Login /> : <Body />}
    </div>
  );
}
export default App;
