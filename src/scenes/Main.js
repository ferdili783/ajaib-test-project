import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

const styles = StyleSheet.create({
    button: {
      marginTop: 16
    }
 });

export default class MainScene extends Component {
    static navigationOptions = {
        title: 'Ajaib Test Project',
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Button block rounded
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('MaximumDiff')}>
                        <Text>1. Maximum Diff</Text>
                    </Button>
                    <Button block rounded
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('MergeTwoSort')}>
                        <Text>2. Merge 2 Sorted Arrays</Text>
                    </Button>
                    <Button block rounded
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('PrintTree')}>
                        <Text>3. Print Tree</Text>
                    </Button>
                    <Button block rounded
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('TransactionBalance')}>
                        <Text>4. Transaction Balance</Text>
                    </Button>
                    <Button block rounded
                        style={styles.button}
                        onPress={() => alert('I believe this app could answer the question number 5')}>
                        <Text>5. View Binding</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}