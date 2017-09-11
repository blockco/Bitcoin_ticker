import React, { Component } from 'react';
import { AppRegistry, Text, View, Picker } from 'react-native';

class Greeting extends Component {
    render() {
        return (
            <Text>Hello {this.props.name}!</Text>
        );
    }
}

export default class LotsOfGreetings extends Component {
    state = {coin: "default12", gotcoins: true, doneloading: false, cindex: 0, coinupdated: false};
    getcoins()
    {
        fetch("https://api.coinmarketcap.com/v1/ticker/")
            .then((response) => response.json())
            .then((response) => {
            console.log(response);
            this.setState({ coins: response, doneloading: true})
            })
            .catch((error) => {console.log("fuckup")})
    }

    updatecoin(){
        if (this.state.coin != "Default")
        {
            fetch("https://api.coinmarketcap.com/v1/ticker/" + this.state.coin)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    this.setState({coinupdate: response, doneloading: true, coinupdated: true})
                })
                .catch((error) => {
                    console.log("fuckup")
                })
        }

    }

    makechoices()
    {
        if (this.state.doneloading) {
            return this.state.coins.map((coin, index) => {
                return (<Picker.Item key={index} label={coin.id} value={coin.id}/>);
            })
        }
    }

    printcoininfo()
    {
        // const pickedcoin = this.state.coins.filter(function(obj) { return obj.name === this.state.coin})
        if (this.state.doneloading && this.state.cindex > 0) {
            return(
                <View>
                    <Text>{this.state.coins[this.state.cindex - 1].name}</Text>
                    <Text>{this.state.coins[this.state.cindex - 1].price_btc}</Text>
                    <Text>{this.state.coins[this.state.cindex - 1].price_usd}</Text>
                    <Text>{this.state.coins[this.state.cindex - 1].id}</Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.gotcoins) {
            this.getcoins();
            this.setState({gotcoins: false})
        }

        return (
            <View>
            <Picker
                selectedValue={this.state.coin}
                onValueChange={(itemValue, itemIndex) => this.setState({coin: itemValue, cindex: itemIndex})}>
                <Picker.Item label="Default" value="Default" />
                { this.makechoices() }
            </Picker>
                {this.printcoininfo()}
            </View>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);