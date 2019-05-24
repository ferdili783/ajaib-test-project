import React, { Component } from 'react';
import { StyleSheet, Clipboard } from 'react-native';
import { Container, Content, Button, Text, Toast } from 'native-base';

const styles = StyleSheet.create({
    queryText: {
        margin: 8,
        padding: 8,
        borderColor: 'grey',
        borderWidth: 1,
        flex: 1
    },
    defaultMarginTop: {
      marginTop: 8
    }
 });

export default class TransactionBalanceScene extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "CREATE TABLE `Transaction` " +
                    "( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `amount` INTEGER NOT NULL DEFAULT 0 ); " +
                    "INSERT INTO [transaction] ('amount') VALUES (5); " +
                    "INSERT INTO [transaction] ('amount') VALUES (2); " +
                    "INSERT INTO [transaction] ('amount') VALUES (8); " +
                    "INSERT INTO [transaction] ('amount') VALUES (62); " +
                    "INSERT INTO [transaction] ('amount') VALUES (34); " +
                    "select id, amount from [transaction]; " +
                    "select a.id, a.amount, " +
                    "(select SUM(amount) as total from [transaction] " +
                    "where id <= a.id) as total from [transaction] a;"
        };
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }
    static navigationOptions = {
        title: 'Transaction Balance',
    }
    copyToClipboard = () => {
        Clipboard.setString(this.state.query);
        Toast.show({
            text: 'Query copied to clipboard'
        })
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={styles.queryText}>{this.state.query}</Text>
                    <Button block rounded
                        style={styles.defaultMarginTop}
                        onPress={this.copyToClipboard}>
                        <Text>Copy to Clipboard</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}