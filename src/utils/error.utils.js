import {Alert} from 'react-native';

export class ErrorUtils {
    constructor(e, title = '') {
        this.errorTitle = title;
        this.errorText = 'Something went wrong';
        if (e.message) {
            this.errorText = e.message;
        } else if (e.responseBody && e.responseBody.message) {
            this.errorText = e.responseBody.message;
        } else if (e.responseBody) {
            this.errorText = e.responseBody;
        }
    }

    showAlert() {
        Alert.alert(
            this.errorTitle,
            String(this.errorText),
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );
    }
}
