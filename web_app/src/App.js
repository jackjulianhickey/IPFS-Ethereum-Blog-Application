import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage'
import NewBlog from './components/pages/new_blog/NewBlog'
import Header from './components/pages/layout/Header'
import Web3 from 'web3';


// import getWeb3 from "./utils/getWeb3";
// import $ from "jquery";
import './App.css';

class App extends Component {

  state = {
    blogs: [
      {
        id: 1,
        title: 'Blog',
        url: 'https://reactjs.org/docs/create-a-new-react-app.html'
      },
      {
        id: 2,
        title: 'blog 2',
        url: 'randomsklejfesoiuhf'
      }
    ],
    contract: ''
  }

  connectWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
    const accounts = await web3.eth.getAccounts();

  //  TODO get contract instance and deploy
  //  TODO add contract to state
  }

  // TODO connect to IPFS
  connectToIPFS = async () => {

  }

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();
  //
  //     // Use web3 to get the user's accounts.
  //     // const accounts = await web3.eth.getAccounts();
  //
  //     // Get the contract instance.
  //     // const networkId = await web3.eth.net.getId();
  //     // const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     // const instance = new web3.eth.Contract(
  //     //   SimpleStorageContract.abi,
  //     //   deployedNetwork && deployedNetwork.address,
  //     // );
  //     //
  //     // // Set web3, accounts, and contract to the state, and then proceed with an
  //     // // example of interacting with the contract's methods.
  //     // this.setState({ web3, accounts, contract: instance, page: 'homepage'}, this.getPosts);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  render() {
    this.connectWeb3();
    return (
      <Router>
        <div className={"App"}>
          <div className={"container"}>
            <Header/>
            <Route exact path={"/"} render={props => (
              <React.Fragment>
                <Homepage blogs={this.state.blogs}/>
              </React.Fragment>
            )}/>
            <Route path="/newblog" component={NewBlog}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
