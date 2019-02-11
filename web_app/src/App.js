import React, { Component } from 'react';
import TruffleContract from 'truffle-contract'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage'
import NewBlog from './components/pages/new_blog/NewBlog'
import {ViewBlog} from './components/pages/view_blog/ViewBlog'
import Header from './components/pages/layout/Header'
import BlogStorageContract from './contracts/BlogStorage'
import ipfs from './IPFS';
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
      viewBlogHash: null,
      viewBlogData: null,
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

      let blog = {id: blogId, hash: blogHash, title: blogTitle};

      this.setState({
        userBlogs: [...this.state.userBlogs, blog]
      })
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

      const { account } = this.state;

      await this.BlogStorageInstance.addPost(result[0].hash, title, {from: account});
    });
  }

  selectedBlogPost = async (blogHash) => {
    this.setState({viewBlogHash: blogHash})

    ipfs.cat(blogHash, async (err, file) => {
      if(err){
        console.log(err)
      } else {
        console.log(file)
        this.setState({viewBlogData: file.toString()})
      }

    })

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
                    <Homepage userBlogs={this.state.userBlogs} selectedBlog={this.selectedBlogPost}/>
                  </React.Fragment>
                )}/>
                <Route path="/newblog" render={props => (
                  <React.Fragment>
                    <NewBlog addBlog={this.addBlog}/>
                  </React.Fragment>
                )}/>
                <Route path={"/viewblog"} render={props => (
                  <React.Fragment>
                    <ViewBlog viewBlogData={this.state.viewBlogData}/>
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
