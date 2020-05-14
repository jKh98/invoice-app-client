import React, {Component} from 'react';
import {ListItem, Text, Body, Right, Left} from 'native-base';

export default class ListView extends Component {
    render() {
        return (
            <ListItem thumbnail onPress={this.props.handleClickEvent}>
                <Left/>
                <Body>
                    <Text>{this.props.title}</Text>
                    <Text note numberOfLines={1}>{this.props.subtitle}</Text>
                </Body>
                <Right>
                    <Text>{this.props.right}</Text>
                </Right>
            </ListItem>
        );
    }
}
