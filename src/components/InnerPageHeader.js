import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import {Actions} from 'react-native-router-flux';

/**
 * Header component with back button for all level 2 pages
 */
class InnerPageHeader extends Component<{}> {

    goBack() {
        Actions.pop();
        Actions.refresh();
    }

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.goBack}>
                        <Icon name={'ios-arrow-back'}/>
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right/>
            </Header>
        );
    };
}

export default InnerPageHeader;
