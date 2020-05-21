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

/**
 * Component that renders the items list
 */
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

    /**
     * called on pressing add button
     * opens item form page with null to indicate adding a new item
     */
    addNewItem() {
        Actions.itemForm({item: null});
    }

    /**
     * called on pressing add button
     * opens item form page with an item object to indicate editing an existing item
     *
     * @param item
     */
    editItem(item) {
        Actions.itemForm({item: item});
    }

    /**
     * Dynamically maps item list to list component
     *
     * @param itemsList
     * @param currency
     * @returns {*}
     */
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
                                this.editItem(item);
                            }
                        }/>
            }
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}

/**
 * map props to item reducer to get items list
 * map props to user reducer to get base currency
 *
 * @param state
 * @returns {{getItems: getItems, getUser: getUser}}
 */
const mapStateToProps = (state) => ({
    getItems: state.itemReducer.getItems,
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
