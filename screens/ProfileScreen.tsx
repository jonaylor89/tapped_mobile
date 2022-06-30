
import { StyleSheet, Text, View, Image, Button
} from 'react-native';
import { SocialIcon } from 'react-native-elements';


const ProfileScreen = () => {
    return (
        <View style={styles.container} >
          <View>
            <Image>
              {/* <source /> = {require('~/Repos/CMSC630_Image_Analysis/datasets/Cancerous_cell_smears/cyl11.BMP')} */}
            </Image>
            <Text>
              Kid Kahuna -- make this changeable via edit Profile
            </Text>
          </View>
          <View>
            <Button title='Edit' style={{
              height: 60,
              width: 60,
              backgroundColor: "white"
            }}
            />
            <SocialIcon button type='twitter'/>
            <SocialIcon button type='tiktok'/>
            <SocialIcon button type='spotify'/>
            <SocialIcon button type='soundcloud'/>
            <SocialIcon button type='instagram'/>
            <SocialIcon button type='youtube'/>
          </View>
          <View>
            <Text>More Info</Text>
            <Text>Lorem Ipsum Dolor Sit</Text>
          </View>
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