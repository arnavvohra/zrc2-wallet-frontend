import React from "react";
import {
  Container,
  Row,
  Col} from "shards-react";
import CountGraph from "./graph/CountGraph";
import PieGraph from "./graph/PieGraph";
import BarGraph from "./graph/BarGraph";
const axios = require('axios');
const config = require('../config');
const hostname = config.apiUrl;
const basePath = "/graph/v1";
const getDappsURL = `${hostname}${basePath}/dapps`;
const getUsersURL = `${hostname}${basePath}/users`;
const getTransactionsURL = `${hostname}${basePath}/meta-transactions`;
const getTransactionsPerDappURL = `${hostname}${basePath}/meta-transactions-by-dapp`;
export default class AdminGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dappCount: 0,
      usersCount: 0,
      dappsPerNetwork: [],
      transactionsPerDay: [],
      transactionsPerDapp: [],
      transactionsPerNetwork: []
    }
  }

  async componentDidMount() {
    this.getUsers();
    await this.getDapps();
    this.getTransactions();
    this.getTransactionsPerDapp();
  }

  async getDapps() {
    axios.get(getDappsURL).then(response => {
      if(response.status == 200) {
        let data = response.data;
        this.setState({
          dappCount: data.total
        });
        this.initDappPerNetwork(data.dapps);
      } else {
        console.error(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  initDappPerNetwork(dapps) {
    let self = this;
    let data = [];
    let countData = {}
    dapps.forEach(dapp => {
        let count = countData[dapp.networkId];
        if(count) {
          count = count + 1;
        } else {
          count = 1;
        }
        countData[dapp.networkId] = count;
    });
    Object.keys(countData).forEach(function(key) {
      data.push({
        count: countData[key],
        network: self.getNetwork(key, countData[key])
      });
    })
    console.log(data);
    this.setState({dappsPerNetwork: data});
  }

  getNetwork(networkId, count) {
    switch(networkId) {
      case "3":
        return `Ropsten(${count})`;
      case "8995":
        return `Matic TestNet(${count})`;
      case "15001":
        return `Matic Beta Mainnet(${count})`;
      case "31":
        return `RSK Testnet(${count})`;
      default:
        return `Unknown(${count})`;
    }
  }

  async getUsers() {
    axios.get(getUsersURL).then(response => {
      if(response.status == 200) {
        let data = response.data;
        this.setState({
          usersCount: data.total
        });
      } else {
        console.error(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  async getTransactions() {
    axios.get(getTransactionsURL).then(response => {
      if(response.status == 200) {
        let data = response.data;
        this.initTransactionsPerDay(data.transactions);
      } else {
        console.error(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  initTransactionsPerDay(transactions) {
    let data = [];
    transactions.forEach(transaction => {
        let entry = {};
        entry.count = transaction.count;
        entry.day = this.getDateString(transaction._id);
        data.push(entry);
    });
    console.log(data);
    this.setState({transactionsPerDay: data});
  }

  initTransactionsPerDapp(transactions) {
    let data = [];
    let self = this;
    transactions.forEach(transaction => {
        if(transaction.dappName && transaction.networkId) {
          let entry = {};
          entry.count = transaction.count;
          entry.dappName = self.getDappNameWithCount(transaction.dappName, transaction.count);
          data.push(entry);
        }
    });
    this.setState({transactionsPerDapp: data});

    let dataPerNetwork = [];
    let networkCountMap = {};
    transactions.forEach(transaction => {
        if(transaction.dappName && transaction.networkId) {
          let networkCount = 0;
          if(networkCountMap[transaction.networkId]) {
            networkCount = networkCountMap[transaction.networkId];
          }
          networkCount += transaction.count;
          networkCountMap[transaction.networkId] = networkCount;
        }
    });
    Object.keys(networkCountMap).forEach(function(key) {
      let entry = {};
      entry.count = networkCountMap[key];
      entry.network = self.getNetwork(key, networkCountMap[key]);
      dataPerNetwork.push(entry);
    })


    this.setState({transactionsPerNetwork: dataPerNetwork});
  }

  getDappNameWithCount(name, count) {
    return `${name}(${count})`;
  }

  async getTransactionsPerDapp() {
    axios.get(getTransactionsPerDappURL).then(response => {
      if(response.status == 200) {
        let data = response.data;
        this.initTransactionsPerDapp(data.transactions);
      } else {
        console.error(response);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  getDateString(date) {
    let result = "";
    if(date.year && date.month && date.day) {
      result = `${date.day}-${date.month}`;
    }
    return result;
  }


  render() {
    return (
      <div>
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4" />
        <Row>
          <Col className="mb-4">
            <div className="graphs-container-header">DApps Statistics</div>
            <div className="graphs-container">
              <CountGraph count={this.state.dappCount} title={"Total DApps"}/>
              <CountGraph count={this.state.usersCount} title={"Total Developers"}/>
              <PieGraph data={this.state.dappsPerNetwork} title={"Dapps per network"}
              valueField="count" argumentField="network"/>
            </div>

          </Col>
        </Row>

        <Row>
          <Col className="mb-4">
            <div className="graphs-container-header">Meta Transactions</div>
            <div className="graphs-container">
              <PieGraph data={this.state.transactionsPerDapp} title={"Transactions per Dapp"}
              valueField="count" argumentField="dappName"/>
              <PieGraph data={this.state.transactionsPerNetwork} title={"Transactions per Network"}
              valueField="count" argumentField="network"/>

              <BarGraph data= {this.state.transactionsPerDay} title={"Transactions per day"}
              valueField="count" argumentField="day"/>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
