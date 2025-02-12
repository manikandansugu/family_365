// AccordionItem.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import API_INSTANCE from '../config/apiClient';

// Replace with your preferred icon library if desired
const NotificationIcon = () => (
  <Text style={{ fontSize: 16, marginRight: 6 }}>🔔</Text>
);

interface NotificationItem {
  notificationId: number;
  memberId: number;
  employeeId: number;
  orphanageId: number;
  subject: string;
  fromMsg: string;
  replyMsg: string;
  readStatus: string;
}

interface AccordionItemProps {
  data: NotificationItem;
  // Callback to trigger when reply is successfully submitted
  onReplySubmitted: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ data, onReplySubmitted }) => {
  const [expanded, setExpanded] = useState(false);
  const [newReply, setNewReply] = useState('');

  const hasReply = !!data.replyMsg?.trim();

  const handleSubmit = async () => {
    if (!newReply.trim()) {
      Alert.alert('Validation', 'Please enter a valid reply');
      return;
    }

    const payload = {
      notificationId: data.notificationId,
      memberId: data.memberId,
      employeeId: data.employeeId,
      orphanageId: data.orphanageId,
      subject: data.subject,
      fromMsg: data.fromMsg,
      replyMsg: newReply, // override with the new reply
      readStatus: data.readStatus,
    };

    try {
      // const response = await fetch(POST_REPLY_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

      const response = await API_INSTANCE.post(
        'v1/notification/update-mem-msg',
        payload
      );

      if (!response?.data) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      Alert.alert('Reply Submitted', 'Your reply has been submitted.');
      setNewReply('');

      // Trigger parent to refresh the notifications
      onReplySubmitted();
    } catch (error) {
      Alert.alert('Submission Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.accordionContainer}>
      {/* Header */}
      <Pressable style={styles.headerContainer} onPress={() => setExpanded(!expanded)}>
        {/* Left side: icon if no existing reply */}
        <View style={styles.headerLeft}>
          {!hasReply && <NotificationIcon />}
          {/* 
             If there's an icon, make subject text narrower. 
             Otherwise, take full width. 
          */}
          <Text
            style={[
              styles.headerTextBase,
              { maxWidth: hasReply ? '95%' : '85%' },
            ]}
            numberOfLines={10} // optional: keep text in one line
            ellipsizeMode="tail"
          >
            {data.subject}
          </Text>
        </View>

        {/* Right side: Arrow icon */}
        <Text
          style={[
            styles.arrowIcon,
            { transform: [{ rotate: expanded ? '180deg' : '0deg' }] },
          ]}
        >
          ▼
        </Text>
      </Pressable>

      {/* Content */}
      {expanded && (
        <View style={styles.contentContainer}>
          {/* FROM MESSAGE */}
          <Text style={styles.label}>From message:</Text>
          <Text style={styles.value}>{data.fromMsg}</Text>

          {/* REPLY SECTION */}
          <Text style={styles.label}>Reply message:</Text>
          {hasReply ? (
            <Text style={styles.value}>{data.replyMsg}</Text>
          ) : (
            <View style={styles.replySection}>
              <TextInput
                placeholder="Enter your reply..."
                placeholderTextColor="#999"
                value={newReply}
                onChangeText={setNewReply}
                multiline
                style={styles.textInput}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 3,
    backgroundColor: '#fff',
    // Shadows (iOS & Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#594CE9',
    padding: 15,
    borderRadius: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // You can also set flex here if you want
    // flex: 1,
  },
  headerTextBase: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrowIcon: {
    marginLeft: 8,
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  value: {
    marginBottom: 8,
    color: '#555',
  },
  replySection: {
    marginVertical: 8,
  },
  textInput: {
    minHeight: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    textAlignVertical: 'top', // for Android multiline
    marginBottom: 10,
    color: '#333',
  },
  submitButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
