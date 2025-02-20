import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQAccordion = () => {
  const SECTIONS = [
    {
      title: '1. What is Inspirations Public Charitable Trust?',
      content:
        'Inspirations Public Charitable Trust is a registered non-profit organization established in 2019. It aims to bridge the gap between the deprived and the provider by fostering strong community bonds.',
    },
    {
      title: '2. What is Family365?',
      content:
        'Family365 is a social initiative that connects families with orphanages and old-age homes, encouraging meaningful interactions and support through digital technology.',
    },
    {
      title: '3. What is the vision of Family365?',
      content:
        'Family365 envisions a world where the concept of "family" is strengthened, reducing the need for orphanages and old-age homes or making them self-sustainable without foreign aid.',
    },
    {
      title: '4. What is the mission of Family365?',
      content:
        'The mission is to provide a platform where individuals and families can collaborate, offer support to those in need, and create sustainable solutions through a mobile application.',
    },
    {
      title: '5. Who can participate in Family365?',
      content:
        'Anyone—individuals, families, organizations, and institutions—can participate in the initiative and contribute towards building a stronger community.',
    },
    {
      title: '6. How do I start using the Family365 app?',
      content: `Download the Family365 app from the App Store or Google Play.

Enter your pincode to find nearby orphanages or old-age homes.

Select your preference (Child Care or Old Age Home).

Choose a date (Birthday, Wedding, or any special occasion).

Make the payment and get connected.

Set reminders and visit your selected home.`,
    },
    {
      title: '7. What if I enter the wrong pincode?',
      content:
        'If you enter the wrong pincode, go to the settings section of the app and update your location details.',
    },
    {
      title: '8. Can I change my selected home after booking?',
      content:
        'Once a booking is made, changes are subject to availability. You can contact support for any modifications.',
    },
    {
      title: '9. Is my payment refundable?',
      content:
        'No, payments made through Family365 are non-refundable, as they directly support the selected homes.',
    },
    {
      title: '10. How will I know if my booking is confirmed?',
      content:
        'You will receive a confirmation email and in-app notification once your booking is successfully completed.',
    },
    {
      title: '11. What if I am unable to visit on the selected day?',
      content:
        'If you are unable to visit, you can reschedule the date once, subject to availability. Contact customer support for assistance.',
    },
    {
      title: '12. Is there a way to track my impact on the home I am connected to?',
      content:
        'Yes, the app provides updates on birthdays, health events, and other important moments from the home you are supporting.',
    },
    {
      title: '13. Can I invite others to join me?',
      content:
        'Yes, you can invite family and friends to participate in your visit by sharing your booking details through the app.',
    },
    {
      title: '14. What if I face technical issues with the app?',
      content:
        'For technical support, contact us via email at sridharaan@inspirationstrust.org or call 98418 26925 / 99620 17102.',
    },
    {
      title: '15. How does Family365 create social bonding?',
      content:
        'By encouraging families to spend quality time with those in need, it fosters strong relationships and a sense of belonging.',
    },
    {
      title: '16. How does this initiative reduce dependency on foreign aid?',
      content:
        'Family365 encourages local participation and sustainable funding through community engagement, reducing reliance on external donations.',
    },
    {
      title: '17. Will my financial contribution be used effectively?',
      content:
        'Yes, all payments go directly towards the registered homes to support their daily needs and services.',
    },
    {
      title: '18. Can businesses or organizations participate in Family365?',
      content:
        'Yes, businesses and corporate teams can collaborate with Family365 for CSR (Corporate Social Responsibility) initiatives.',
    },
    {
      title: '19. Is my personal information safe on the Family365 app?',
      content:
        'Yes, we prioritize data security and follow strict privacy protocols to protect user information.',
    },
    {
      title: '20. What payment methods are accepted?',
      content:
        'Family365 accepts UPI, credit/debit cards, net banking, and digital wallet payments.',
    },
    {
      title: '21. Can I opt-out of receiving notifications?',
      content:
        'Yes, you can manage your notification settings in the app under the ‘Settings’ section.',
    },
    {
      title: '22. How do I report suspicious activity on the app?',
      content:
        'If you encounter any suspicious activity, report it immediately through the ‘Help & Support’ section or email us at sridharaan@inspirationstrust.org.',
    },
    {
      title: '23. How can I contact Family365 for more details?',
      // For this section, we'll use clickable items for phone, email, and website.
      content: '', // Not used as we override in renderContent below.
    },
    {
      title: '24. Where can I follow Family365 for updates?',
      content:
        'You can follow us on our website and social media pages for the latest updates and community stories.',
    },
  ];

  const [activeSections, setActiveSections] = useState([]);

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = (url) => {
    Linking.openURL(url);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.header, isActive ? styles.activeHeader : null]}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    // For the "contact" FAQ, render clickable items.
    if (section.title.includes('How can I contact Family365')) {
      return (
        <View style={styles.content}>
          <Text style={styles.contentText}>You can reach us through the following:</Text>
          <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Phone:</Text>
            <TouchableOpacity onPress={() => handlePhonePress('9841826925')}>
              <Text style={[styles.highlight, styles.linkText]}>98418 26925</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> / </Text>
            <TouchableOpacity onPress={() => handlePhonePress('9962017102')}>
              <Text style={[styles.highlight, styles.linkText]}>99620 17102</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Email:</Text>
            <TouchableOpacity onPress={() => handleEmailPress('sridharaan@inspirationstrust.org')}>
              <Text style={[styles.highlight, styles.linkText]}>sridharaan@inspirationstrust.org</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Website:</Text>
            <TouchableOpacity onPress={() => handleWebsitePress('https://www.inspirationstrust.org')}>
              <Text style={[styles.highlight, styles.linkText]}>www.inspirationstrust.org</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    // Default rendering for other sections.
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
        underlayColor="transparent"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    backgroundColor: '#e2e2e2',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  activeHeader: {
    backgroundColor: '#d0d0d0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 5,
    borderRadius: 5,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlight: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 14,
  },
});

export default FAQAccordion;
