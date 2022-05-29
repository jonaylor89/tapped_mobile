
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


const ProfileScreen = () => {
  return (
    <View style={styles.container} >
      <View style={styles.row}>
        <Button
          title="Edit"
          onPress={() => Alert.alert('whoa')}
        />
        <View style={styles.row}>
          <Text style={styles.text}>twitter</Text>
          <Text style={styles.text}>instagram</Text>
          <Text style={styles.text}>tiktok</Text>
          <Text style={styles.text}>soundcloud</Text>
        </View>
      </View>
      <Text style={styles.header}>More Info</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </Text>

      <Text style={styles.header}>Badges</Text>
      <Text style={styles.text}>List of Badges</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    flex: 1,
    backgroundColor: '#171717',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 30,
    paddingBottom: 15,
  },
  text: {
    padding: 3,
    color: '#fff',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});



export default ProfileScreen;