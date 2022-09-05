import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AccountType, OnboardedUser } from '../../domain/models';

const AccountTypeBadge = ({ user }: { user: OnboardedUser | null }) => {
  if (!user) return null;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    basic: {
      backgroundColor: 'green',
      margin: 8,
      borderRadius: 4,
    },
    business: {
      margin: 8,
      borderRadius: 4,
      backgroundColor: 'gold',
    },
    text: {
      padding: 6,
    },
  });

  if (user.accountType === AccountType.Business) {
    return (
      <View style={styles.container}>
        <View style={styles.business}>
          <Text style={styles.text}>Business</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.basic}>
          <Text style={styles.text}>Basic</Text>
        </View>
      </View>
    );
  }
};

export default AccountTypeBadge;
