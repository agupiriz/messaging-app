import React, { useCallback, useRef, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { CameraView, useCameraPermissions } from "expo-camera";

import { SendMessageResponse } from "../../../api/domain/chat/chat.types";
import { Icon } from "../../../components/Icon/Icon";
import { Color } from "../../../constants/colors";
import { useSendImageMessage } from "../../../hooks/useSendMessage";
import { setAddEvent, setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

function AttachmentButton() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(getMessageInput);
  const { showActionSheetWithOptions } = useActionSheet();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const { mutate: sendImageMessage, isPending: isSendingImage } =
    useSendImageMessage();

  const openCamera = useCallback(async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        return;
      }
    }

    setIsCameraOpen(true);
  }, [permission, requestPermission]);

  const handleAttachPress = useCallback(() => {
    const options = ["Camara", "Fototeca", "Archivo", "Audio", "Cancelar"];
    const cancelButtonIndex = 4;
    const disabledButtonIndices = [1, 2, 3];

    showActionSheetWithOptions(
      { options, cancelButtonIndex, disabledButtonIndices },
      (selectedIndex) => {
        if (selectedIndex === 0) {
          openCamera();
        }
      }
    );
  }, [openCamera, showActionSheetWithOptions]);

  const handleCloseCamera = useCallback(() => {
    if (!isCapturing) {
      setIsCameraOpen(false);
    }
  }, [isCapturing]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || isCapturing || isSendingImage) {
      return;
    }

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

      if (!photo?.uri) {
        return;
      }

      const formData = new FormData();
      const fileName = `photo-${Date.now()}.jpg`;

      formData.append(
        "image",
        { uri: photo.uri, name: fileName, type: "image/jpeg" } as any
      );

      const caption = message?.trim();
      if (caption) {
        formData.append("caption", caption);
      }

      sendImageMessage(formData, {
        onSuccess: (response: SendMessageResponse) => {
          dispatch(setAddEvent(response.data));
          dispatch(setMessageInput(undefined));
        },
      });

      setIsCameraOpen(false);
    } finally {
      setIsCapturing(false);
    }
  }, [dispatch, isCapturing, isSendingImage, message, sendImageMessage]);

  return (
    <>
      <TouchableOpacity
        style={styles.attachButton}
        onPress={handleAttachPress}
        disabled={isSendingImage}
      >
        <Icon name="paperclip" size={22} color={Color.PRIMARY_500} />
      </TouchableOpacity>

      <Modal visible={isCameraOpen} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />

          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseCamera}
              disabled={isCapturing}
            >
              <Icon name="xmark" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
              disabled={isCapturing}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default React.memo(AttachmentButton);

const styles = StyleSheet.create({
  attachButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
});
