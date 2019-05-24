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

export default class MergeTwoSortScene extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstNumbers : '',
        firstArray: [],
        secondNumbers : '',
        secondArray: [],
        finalSorted: '',
        finalArray: [],
        isValid:true
      };
      this.firstNumberChange = this.firstNumberChange.bind(this);
      this.submit = this.submit.bind(this);
      this.validateInputAndSetArray = this.validateInputAndSetArray.bind(this);
      this.sort = this.sort.bind(this);
    }
    static navigationOptions = {
        title: 'Merge 2 Sorted Arrays',
    }
    firstNumberChange = (value) =>{
        this.setState({ firstNumbers:value, finalSorted: '', isValid:true });
    }
    secondNumberChange = (value) =>{
        this.setState({ secondNumbers:value, finalSorted: '', isValid:true });
    }
    validateInputAndSetArray = (numbers, index, callback) => {
        let arrayInt = [];
        if(numbers){
            let arrayNumber = numbers.split(',');
            if(arrayNumber && arrayNumber.length){
                let isValid = true;
                for(let i=0, len=arrayNumber.length; i<len; i++){
                    let number = parseInt(arrayNumber[i]);
                    let compareNumber = parseInt(arrayNumber[i+1]);
                    if(!number || isNaN(number) || (!isNaN(compareNumber) && !compareNumber)){
                        isValid = false;
                        break;
                    }
                    else if(!isNaN(compareNumber) && number > compareNumber){
                        isValid = false;
                        break;
                    }
                    else{
                        arrayInt.push(number);
                    }
                }
                this.setState({isValid: isValid});
            }
        }
        if(index == 1){
            this.setState({firstArray: arrayInt}, () => {
                callback(true);
            });
        } else {
            this.setState({secondArray: arrayInt}, () => {
                callback(true);
            });
        }
    }
    sort = () => {
        let finalArray = this.state.finalArray;
        let firstArray = this.state.firstArray;
        let secondArray = this.state.secondArray;
        var i = 0;
        if(firstArray[i] && secondArray[i]){
          if(firstArray[i] <= secondArray[i]){
            finalArray.push(firstArray[i]);
            firstArray.splice(i, 1);
          }
          else{
            finalArray.push(secondArray[i]);
            secondArray.splice(i, 1);
          }
        }
        else if(firstArray[i]){
          finalArray.push(firstArray[i]);
          firstArray.splice(i, 1);
        }
        else if(secondArray[i]){
          finalArray.push(secondArray[i]);
          secondArray.splice(i, 1);
        }
        this.setState({
            finalArray: finalArray,
            firstArray: firstArray,
            secondArray: secondArray
        }, () => {
            if((firstArray && firstArray.length) || (secondArray && secondArray.length)){
                this.sort();
            }
            else{
                let finalSorted = finalArray.join(",");
                this.setState({ finalSorted: finalSorted });
            }
        });
    }
    submit = () =>{
        this.setState({
            firstArray: [],
            secondArray: [],
            finalArray: [],
            finalSorted: ''
        }, () => {
            this.validateInputAndSetArray(this.state.firstNumbers, 1, () =>{
                if(this.state.isValid){
                    this.validateInputAndSetArray(this.state.secondNumbers, 2, () => {
                        if(this.state.isValid){
                            this.sort();
                        }
                    });
                }
            });
        });
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={styles.defaultMarginTop}>
                        Input First Sorted Numbers (minimum number is 1, separate with comma, and should be sorted)
                    </Text>
                    <Item regular style={styles.defaultMarginTop}>
                        <Input placeholder='Input first sorted numbers'
                            keyboardType='decimal-pad'
                            value={this.state.firstNumbers}
                            onChangeText={val => this.firstNumberChange(val)}/>
                    </Item>
                    <Text style={styles.defaultMarginTop}>
                        Input Second Sorted Numbers (minimum number is 1, separate with comma, and should be sorted)
                    </Text>
                    <Item regular style={styles.defaultMarginTop}>
                        <Input placeholder='Input second sorted numbers'
                            keyboardType='decimal-pad'
                            value={this.state.secondNumbers}
                            onChangeText={val => this.secondNumberChange(val)}/>
                    </Item>
                    <Button block rounded
                        style={styles.defaultMarginTop}
                        onPress={this.submit}>
                        <Text>Submit</Text>
                    </Button>
                    {
                        this.state.finalSorted ?
                            <Text style={styles.defaultMarginTop}>
                                Final Sorted Array is : {this.state.finalSorted}
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