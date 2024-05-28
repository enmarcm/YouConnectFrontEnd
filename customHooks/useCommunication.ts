import { Linking, Platform } from 'react-native';

export const useCommunication = () => {
  const handleCallPress = (phoneNumber: string) => {
    let formattedNumber = '';

    if (Platform.OS === 'android') {
      formattedNumber = `tel:${phoneNumber}`;
    } else {
      formattedNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(formattedNumber);
  };

  const handleSmsPress = (phoneNumber: string) => {
    let formattedNumber = '';

    if (Platform.OS === 'android') {
      formattedNumber = `sms:${phoneNumber}`;
    } else {
      // for iOS
      formattedNumber = `sms:/open?addresses=${phoneNumber}`;
    }

    Linking.openURL(formattedNumber);
  };

  return { handleCallPress, handleSmsPress };
};