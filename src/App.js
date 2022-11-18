import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import Home from "./Pages/Home";
import Navigation from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Component } from "react";
import Verify from "./Pages/Verify";
import Request from "./Pages/Request";
import Detail from "./Pages/Detail";
import MyRequest from "./Pages/MyRequest";
import { CHARITY_ADDRESS, CHARITY_ABI } from "./config";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const API_SECRET_KEY = "6408ca161aecf29fcd774d0e7c41a2b8";
const PROJECT_ID = "2HXOnQR7DDPNcC94ilkSvKrEhhk";
const AUTH =
  "Basic " + Buffer.from(PROJECT_ID + ":" + API_SECRET_KEY).toString("base64");

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async connectWallet() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((add) => {
            this.state.wallet = add.toString();
            resolve(this.state.wallet);
          })
          .catch((err) => {
            alert("couldn't connect!");
            reject("");
          });
      } else {
        alert("install metamask extension!!");
        reject("");
      }
    });
  }

  getWalletAdd() {
    return this.state.wallet;
  }

  async loadBlockchainData() {
    // console.log(Web3.givenProvider)
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.state.contract = new web3.eth.Contract(CHARITY_ABI, CHARITY_ADDRESS);
  }


  constructor(props) {
    super(props);
    this.connectWallet = this.connectWallet.bind(this);
    this.getWalletAdd = this.getWalletAdd.bind(this);
    this.state = {
      account: "",
      wallet: "",
      contract: {},
      client: create({
        host: "ipfs.infura.io",
        // host: "infura-ipfs.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: AUTH,
        },
      }),
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation
            connectWallet={this.connectWallet}
            getWalletAdd={this.getWalletAdd}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  client={this.state.client}
                  contract={this.state.contract}
                />
              }
            />
            <Route
              path="/verify"
              element={<Verify contract={this.state.contract} />}
            />
            <Route
              path="/request"
              element={<Request contract={this.state.contract} />}
            />
            <Route
              path="/details"
              element={<Detail contract={this.state.contract} />}
            />
            <Route path="/myrequest" element={<MyRequest/>} />

            
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
