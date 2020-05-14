import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Body, Container, Content, Fab, Header, Icon, Left, Right, Title} from 'native-base';


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
                <Content>
                </Content>
                <View style={{flex: 1}}>
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
        alert('new item')
    }
}

export default Items;
