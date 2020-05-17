import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {Body, Container, Content, Fab, Header, Text, Icon, Left, List, Right, Title} from 'native-base';
import ListView from '../../components/ListView';
import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from '../../utils/error.utils';
import {getItemsList} from '../../actions/item.actions';
import Loader from '../../components/Loader';
import {connect} from 'react-redux';

class Items extends Component<{}> {
    componentDidMount() {
        this.loadItemsList();
    }

    async loadItemsList() {
        try {
            const response = await this.props.dispatch(getItemsList());
            console.log(response)
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    render() {
        const {getItems} = this.props;
        return (
            <Container>
                {getItems.isLoading && <Loader/>}
                <Header>
                    <Left/>
                    <Body>
                        <Title>Items</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>
                    {this.renderItemsList(getItems.itemsList||[])}
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
        Actions.itemForm({item: null});
    }

    openItemPage(item) {
        Actions.itemForm({item: item});
    }

    renderItemsList(itemsList) {
        console.log(itemsList)
        return (<List
            dataArray={itemsList}
            renderRow={
                (item) =>
                    <ListView
                        title={item.name}
                        subtitle={item.description}
                        right={item.price}
                        handleClickEvent={
                            () => {
                                this.openItemPage(item);
                            }
                        }/>
            }>
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}

const mapStateToProps = (state) => ({
    getItems: state.itemReducer.getItems,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
