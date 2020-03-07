import React from "react";
import {
  Card,
  CardHeader,
  CardBody} from "shards-react";
import axios from "axios";
import config from "../../config";

const { units, BN } = require('@zilliqa-js/util') ;

export default class Announcements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txList: []
    };
  }
  componentWillMount() {
    let address = localStorage.getItem("address");
    address = address.substring(2);
    axios.defaults.headers.common["X-APIKEY"] = "f1e27b185882aa038f2eca2a7595b7926c17235f79c179a444ccd20813823d39";
    const self = this;
    axios
      .get(`https://api.viewblock.io/v1/zilliqa/addresses/${address}/txs?network=testnet`)
      .then(function(response) {
          if(response){
            self.setState({ txList: response.data });
          }
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render(){
    return(
      <Card small className="blog-comments announcements">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Transaction History</h6>
      </CardHeader>
  
      <CardBody className="p-0">
        {this.state.txList.map((tx, idx) => (
          <div key={idx} className="blog-comments__item d-flex p-3">
            {/* Content */}
            <div className="blog-comments__content">
              {/* Content :: Title */}
              <div className="blog-comments__meta text-mutes">
                <a href={`https://viewblock.io/zilliqa/tx/${tx.hash}/?network=testnet`} target="_blank">
                  Transaction Link
                </a>
                <font size="2">
                <div>
                  {"Sent From : "+ tx.from} <br/>
                  {"Sent To : "+ tx.to} <br/>
                  {"Fees : "+ units.fromQa(new BN(tx.fee), units.Units.Zil)}<br/>         
                  {"Time: "+ new Date(tx.timestamp)}
                  
                </div>
                </font>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
  
    </Card>

    );

  }
}
Announcements.defaultProps = {
  title: "Transaction History",
  discussions: [
    {
      id: 1,
      date: "1 day ago",
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "ZRC-2 Wallet Alpha Release",
        url: "#"
      },
      body: "Hey Zilliqa HODLers, the wait is over!! We have released alpha version of our ZRC-2 Wallet for you to safely store, receive and send ZRC-2 tokens."
    }
  ]
};
