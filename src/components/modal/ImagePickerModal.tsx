import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {COLOR} from '../../utils/colors';

const {width} = Dimensions.get('window');

interface ImageUploadModalProps {
  visible: boolean | undefined;
  onClose: () => void;
  onOpenCamera: () => void;
  onOpenLibrary: () => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  visible,
  onClose,
  onOpenCamera,
  onOpenLibrary,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          setModalVisible(false);
        }}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <Text style={styles.title}>Upload Image</Text>
          <TouchableOpacity style={styles.optionButton} onPress={onOpenCamera}>
            <Text style={styles.optionText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onOpenLibrary}>
            <Text style={styles.optionText}>Upload from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLOR.bgBlue,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLOR.white,
  },
  optionButton: {
    width: width * 0.8,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLOR.black,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 10,
    width: width * 0.8,
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLOR.bgRed,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ImageUploadModal;
