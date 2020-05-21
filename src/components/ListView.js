import React, {Component} from 'react';
import {Body, ListItem, Right, Text} from 'native-base';

/**
 * Component that maps list parameters to a list item component dynamically
 */
export default class ListView extends Component {
    render() {
        return (
            <ListItem noIndent onPress={this.props.handleClickEvent}>
                <Body style={{flex:1}}>
                    <Text>{this.props.title}</Text>
                    <Text note numberOfLines={1}>{this.props.subtitle}</Text>
                </Body>
                <Right>
                    <Text>{this.props.right}</Text>
                    {this.props.rightSub && <Text note numberOfLines={1}>{this.props.rightSub}</Text>}
                </Right>
            </ListItem>
        );
    }
}
