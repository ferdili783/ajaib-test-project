import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, Button, Input, 
    Text, List, ListItem, Left, Body, Right } from 'native-base';
import _ from 'underscore';

const styles = StyleSheet.create({
    button: {
      marginTop: 12
    },
    printButton: {
        marginTop: 20,
        marginBottom: 20
    }
 });

export default class PrintTreeScene extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes: [{
                id: '1',
                from: '',
                to: ''
            }],
            treeNodes: []
        };
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.updateNodesItem = this.updateNodesItem.bind(this);
        this.addNodesItem = this.addNodesItem.bind(this);
        this.printTreeNodes = this.printTreeNodes.bind(this);
    }
    static navigationOptions = {
        title: 'Print Tree',
    }
    handleFromChange = (value, item, index) =>{
        if(item){
            item.from = value;
            this.updateNodesItem(item, index);
        }
    }
    handleToChange = (value, item, index) =>{
        if(item){
            item.to = value;
            this.updateNodesItem(item, index);
        }
    }
    updateNodesItem = (item, index) => {
        if(this.state.nodes){
            let nodes = this.state.nodes;
            nodes[index] = item;
            this.setState({ nodes: nodes });
        }
    }
    addNodesItem = () => {
        if(this.state.nodes){
            let nodes = this.state.nodes;
            nodes.push({
                id: '' + (nodes.length + 1),
                from: '',
                to: ''
            });
            this.setState({ nodes: nodes });
        }
    }
    printTreeNodes = () => {
        if(this.state.nodes){
            let nodes = this.state.nodes;
            let treeNodes = [];
            for(let i=0, len=nodes.length; i<len; i++){
                let node = nodes[i];
                if(node && node.from && node.to){
                    if(i == 0){
                        treeNodes.push({
                            from: node.from,
                            to: node.to,
                            path: node.from + ' => ' + node.to
                        });
                    }
                    else{
                        treeNode = _.findWhere(treeNodes, {
                            to: node.from
                        });
                        if(treeNode){
                            treeNode.to = node.to;
                            treeNode.path = treeNode.path + ' => ' + node.to
                        }
                        else{
                            treeNodes.push({
                                from: node.from,
                                to: node.to,
                                path: node.from + ' => ' + node.to
                            });
                        }
                    }
                }
            }
            this.setState({ treeNodes: treeNodes });
        }
    }
    renderItem = ({ item, index }) => {
        if (item) {
          return (
            <ListItem>
                <Left>
                    <Input 
                        placeholder='From'
                        maxLength={1}
                        value={this.state.nodes[index].from}
                        onChangeText={val => this.handleFromChange(val, item, index)}/>
                </Left>
                <Body>
                    <Text>=></Text>
                </Body>
                <Right>
                    <Input
                        placeholder='To'
                        maxLength={1}
                        value={this.state.nodes[index].to}
                        onChangeText={val => this.handleToChange(val, item, index)}/>
                </Right>
            </ListItem>
          );
        }
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <FlatList
                        data={this.state.nodes}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}/>
                    <Button rounded primary 
                        style={styles.button}
                        onPress={this.addNodesItem}>
                        <Text>Add Node</Text>
                    </Button>
                    <Button block primary 
                        style={styles.printButton}
                        onPress={this.printTreeNodes}>
                        <Text>Print Tree Node</Text>
                    </Button>
                    <FlatList
                        data={this.state.treeNodes}
                        extraData={this.state}
                        renderItem={({ item, index }) => {
                            if (item) {
                              return (
                                <ListItem>
                                    <Text>{item.path}</Text>
                                </ListItem>
                              );
                            }
                        }}
                        keyExtractor={item => item.path}/>
                </Content>
            </Container>
        );
    }
}