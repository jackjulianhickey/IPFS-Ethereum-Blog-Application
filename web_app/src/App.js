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
      contract: null,
      web3: null,
      accounts: null,
      loading: false,
      userBlogs: [],
      userPostsNum: null,
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
      console.log(account)
      this.BlogStorageContract.deployed().then((BlogStorageInstance) => {
        this.BlogStorageInstance = BlogStorageInstance;
        this.BlogStorageInstance.postsCount().then((numPostsCount) => {
          this.setState({userPostsNum: numPostsCount});
          console.log(this.state.userPostsNum);
          this.getPosts(numPostsCount);
        });
      });
    });
  }

  getPosts =  async (numPosts) => {
    console.log(numPosts)
    for (let i = numPosts; i >= 1; i--) {
      let blogId = i;
      let blogHash =  await this.BlogStorageInstance.getPostHash(i);
      let blogTitle =  await this.BlogStorageInstance.getPostName(i);
      let hash = "/ipfs/"+blogHash
      ipfs.cat(hash, async (err, file) => {
        console.log(file.toString())

      })
      let blogSrc = "https://ipfs.io/ipfs/"+blogHash

      let blog = {id: blogId, hash: blogSrc, title: blogTitle};

      this.setState({
        userBlogs: [...this.state.userBlogs, blog]
      })
      //this.state.userBlogs.push(blog);
    }


  }

  numPosts =  () => {
    let numPosts = this.BlogStorageInstance.getPostCount();
    return numPosts;
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
                    <Homepage userBlogs={this.state.userBlogs}/>
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
