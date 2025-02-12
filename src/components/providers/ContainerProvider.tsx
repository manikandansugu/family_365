import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, SafeAreaView} from 'react-native';
import {ContainerProviderProps} from '../../entities/commonObjects';
import HeaderView from '../view/HeaderView';
import ImageUploadModal from '../modal/ImagePickerModal';
import Loader from '../view/LoaderView';

const ContainerProvider = (props: ContainerProviderProps) => {
  const {
    children,
    headerProps,
    openCamera,
    openLibrary,
    isModalVisible,
    setModalVisible,
    loading,
  } = props ?? {};
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.flex1}>
        {headerProps && <HeaderView {...headerProps} />}
        <View style={styles.flex1}>{children}</View>
        <ImageUploadModal
          visible={isModalVisible ?? false}
          onClose={() => setModalVisible && setModalVisible(false)}
          onOpenCamera={openCamera || (() => {})}
          onOpenLibrary={openLibrary || (() => {})}
          setModalVisible={setModalVisible || (() => {})}
        />
        <Loader isVisible={loading} message="Loading, please wait..." />
      </SafeAreaView>
    </>
  );
};

export default ContainerProvider;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
