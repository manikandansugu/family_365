import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import FAQAccordion from './FAQAccordion';
import ContainerProvider from '../components/providers/ContainerProvider';
import { useAuthState } from '../context/AuthContext';

const FAQScreen = () => {
    const { user } = useAuthState() ?? {};
  return (
    <ContainerProvider headerProps={{ type: 2, headerTitle: `Hello, ${user?.firstName}` }}>
         <Text style={styles.title}>Frequently Asked Questions</Text>
    <SafeAreaView style={{ flex: 1 }}>
      <FAQAccordion />
    </SafeAreaView>
    </ContainerProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
    alignSelf: 'center',
    color: '#333',
  },
});

export default FAQScreen;
