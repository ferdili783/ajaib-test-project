import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Item, Input } from 'native-base';

const styles = StyleSheet.create({
    defaultMarginTop: {
      marginTop: 8
    },
    errorMessage: {
        color: 'red'
    }
 });

export default class MaximumDiffScene extends Component {
    constructor(props) {
      super(props);
      this.state = { numbers : '', maximumDiff: 0, isValid:true };
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
    }
    static navigationOptions = {
        title: 'Maximum Diff',
    }
    handleChange = (value) =>{
        this.setState({ numbers:value, maximumDiff: 0, isValid:true });
    }
    submit = () =>{
        let numbers = this.state.numbers;
        if(numbers){
            let arrayNumber = numbers.split(',');
            let arrayDiff = [];
            if(arrayNumber && arrayNumber.length){
                let isValid = true;
                for(let i=0, len=arrayNumber.length; i<len; i++){
                    let number = parseInt(arrayNumber[i]);
                    let compareNumber = parseInt(arrayNumber[i+1]);
                    if(!number || isNaN(number) || (!isNaN(compareNumber) && !compareNumber)){
                        isValid = false;
                        break;
                    }
                    else if(!isNaN(compareNumber)){
                        let diff = number - compareNumber;
                        if(diff > 0){
                            arrayDiff.push(diff);
                        }
                    }
                }
                if(arrayDiff.length && isValid){
                    max = Math.max.apply(Math, arrayDiff);
                    this.setState({maximumDiff: max});
                }
                else{
                    this.setState({isValid: isValid});
                }
            }
        }
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={styles.defaultMarginTop}>
                        Input Numbers (minimum number is 1 and separate with comma)
                    </Text>
                    <Item regular style={styles.defaultMarginTop}>
                        <Input placeholder='Input numbers'
                            keyboardType='decimal-pad'
                            value={this.state.numbers}
                            onChangeText={val => this.handleChange(val)}/>
                    </Item>
                    <Button block rounded
                        style={styles.defaultMarginTop}
                        onPress={this.submit}>
                        <Text>Submit</Text>
                    </Button>
                    {
                        this.state.maximumDiff ?
                            <Text style={styles.defaultMarginTop}>
                                Maximum Diff is : {this.state.maximumDiff}
                            </Text>
                        : null
                    }
                    {
                        !this.state.isValid ?
                            <Text style={[styles.defaultMarginTop, styles.errorMessage]} >
                                Invalid Input
                            </Text>
                        : null
                    }
                </Content>
            </Container>
        );
    }
}