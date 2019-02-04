import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// import web3 from './Web3_Setup'
import web3 from 'web3'
import TruffleContract from 'truffle-contract'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage'
import NewBlog from './components/pages/new_blog/NewBlog'
import Header from './components/pages/layout/Header'
import BlogStorageContract from './contracts/BlogStorage'
import ipfs from './IPFS';


// import getWeb3 from "./utils/getWeb3";
// import $ from "jquery";
import './App.css';
import Web3 from "web3";

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
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
      contract: null,
      web3: null,
      accounts: null,
      loading: false
    };

    let web3 = window.web3;

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)
    this.BlogStorageContract = TruffleContract(BlogStorageContract)
    this.BlogStorageContract.setProvider(this.web3Provider)

  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.BlogStorageContract.deployed().then((BlogStorageInstance) => {
        this.BlogStorageInstance = BlogStorageInstance
      });
    });
  }

  getPosts = async () => {
    // const { contract } = this.state;
    // const numPosts = await contract.methods.getPostCount().call();
    // console.log("Num Posts: " + numPosts);

  }

  addBlog = async (title, blog) => {
    // TODO add blog to IPFS and Ethereum

    let buffer = await Buffer.from(blog);
    console.log("buffer: ", buffer);

    ipfs.files.add(buffer, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Result: ", result[0].hash, );

      const { account } = this.state;

      await this.BlogStorageInstance.addPost(result[0].hash, title, {from: account});


    });
  }


  render() {
    {
      if (this.state.loading) {
        return (
          <h1>Loading</h1>);
      } else {
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
                <Route path="/newblog" render={props => (
                  <React.Fragment>
                    <NewBlog addBlog={this.addBlog}/>
                  </React.Fragment>
                )}/>
              </div>
            </div>
          </Router>
        );
      }
    }
  }
}

export default App;
