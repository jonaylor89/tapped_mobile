
import { StyleSheet,Text, View } from 'react-native';


const ProfileScreen = () => {
    return (
        <View style={styles.container} >
            <Text>Profile Screen</Text>
            <Text>Profile Page - Test</Text>
            <Text>Profile Page - Michael</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });



export default ProfileScreen;