import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {Body, Container, Content, Fab, Header, Text, Icon, Left, List, Right, Title} from 'native-base';
import ListView from '../../components/ListView';
import {Actions} from 'react-native-router-flux';

const tempItems = [
    {
        name: 'Item1',
        description: 'nothing',
        price: 20,
    }, {
        name: 'Item2',
        description: 'nothing',
        price: 100,
    }, {
        name: 'Item3',
        description: 'nothing',
        price: 0.11,
    }, {
        name: 'Item4',
        description: 'nothing',
        price: 12000,
    }, {
        name: 'Item5',
        description: 'nothing',
        price: 0.120,
    },
    {
        name: 'Item1',
        description: 'nothing',
        price: 20,
    }, {
        name: 'Item2',
        description: 'nothing',
        price: 100,
    }, {
        name: 'Item3',
        description: 'nothing',
        price: 0.11,
    }, {
        name: 'Item4',
        description: 'nothing',
        price: 12000,
    }, {
        name: 'Item5',
        description: 'nothing',
        price: 0.120,
    },
    {
        name: 'Item1',
        description: 'nothing',
        price: 20,
    }, {
        name: 'Item2',
        description: 'nothing',
        price: 100,
    }, {
        name: 'Item3',
        description: 'nothing',
        price: 0.11,
    }, {
        name: 'Item4',
        description: 'nothing',
        price: 12000,
    }, {
        name: 'Item5',
        description: 'nothing',
        price: 0.120,
    },
];

class Items extends Component<{}> {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Items</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>
                    {this.renderItemsList()}
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.addNewItem();
                        }}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    };

    addNewItem() {
        // alert('new item');
        Actions.addItem();
    }

    openItemPage() {
        alert('opened');
    }

    renderItemsList() {
        return (<List
            dataArray={tempItems}
            renderRow={
                (item) =>
                    <ListView
                        title={item.name}
                        subtitle={item.description}
                        right={item.price}
                        handleClickEvent={
                            this.openItemPage
                        }/>
            }>
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}

export default Items;
