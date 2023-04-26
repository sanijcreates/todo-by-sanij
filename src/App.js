import {useEffect, useState} from 'react';
import {app, db} from './firebaseConfig'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {collection, addDoc, getDocs, deleteDoc, doc} from 'firebase/firestore'

const provider = new GoogleAuthProvider();
const auth = getAuth();
function App() {
  const collectionRef = collection(db, 'groups')
  const threadRef = collection(db, 'threads')
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [ids, setIds] = useState([]);
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }

    setData({ ...data, ...inputs })
  }
  function handleSubmit(event) {
    //this will help not reload the submit
    event.preventDefault();
     addDoc(collectionRef, {
      email: data.email,
      password: data.password
    })
      .then(() => {
        alert("Data Added")
        getData();
      })
      .catch((error) => {
        console.log(error)
      })
  // event.preventDefault();
  //  signInWithPopup(auth, provider) 
    
  //   .then((result) => {
  //     console.log(result)
  //   }).catch((error)=> {
  //     console.log(error)
  //   })
  }
  function displayData() {
    return (
      <div>
        {ids.map(el => (
          <button key = {el.id} onClick={() => deleteData(el.id)}>{el.id}</button>
        ))
      }
      </div>
    )
      
  }
  
  function getData() {
    getDocs(collectionRef)
    .then((res) => {
      alert("getting data");
      const datas = res.docs.map(el => {
        //this will add ids to all the collection. 
        return {...el.data(), id: el.id}
      });
      setIds(datas);
      })
    .catch(err => {
      console.log(err);
    })
  }

  function deleteData(id) {
    const docToUpdate = doc(db, 'groups', id)
    deleteDoc(docToUpdate)
      .then(res => {
        alert("data Deleted")
        setIds(ids.filter(el => el.id !== id))
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sanij</h1>
        <form onSubmit={handleSubmit}>
          <input
          placeholder="Email"
          name="email"
          type="email"
          className="input-fields"
          onChange={event => handleInputs(event)}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="input-fields"
          onChange={event => handleInputs(event)}
        />
          <input type="submit" value="Signin" />
        </form>
        {ids.length > 0 ? displayData(): null}
      </header>
    </div>
  );
}

export default App;
