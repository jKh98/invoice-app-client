import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Fab, Icon, List} from 'native-base';
import ListView from '../../components/ListView';
import {Actions} from 'react-native-router-flux';
import Loader from '../../components/Loader';
import {connect} from 'react-redux';
import Logo from '../../components/Logo';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';
import PageHeader from '../../components/MainPageHeader';

class Items extends Component<{}> {
    render() {
        const {getItems, getUser: {userDetails}} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                {getItems.isLoading && <Loader/>}
                <PageHeader title={'Items'}/>
                <View style={{flex: 1}}>
                    {this.renderItemsList(getItems.itemsList || [], currency)}
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

    renderItemsList(itemsList, currency) {
        return (<List
            ListEmptyComponent={
                <EmptyListPlaceHolder
                    type={'item'}
                    message={'No items found.\nPress the plus button to add new items.'}/>}
            dataArray={itemsList}
            renderRow={
                (item) =>
                    <ListView
                        title={item.name}
                        subtitle={item.description}
                        right={formatCurrency(item.price, currency)}
                        ListEmptyComponent={Logo}
                        handleClickEvent={
                            () => {
                                this.openItemPage(item);
                            }
                        }/>
            }
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}

const mapStateToProps = (state) => ({
    getItems: state.itemReducer.getItems,
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
