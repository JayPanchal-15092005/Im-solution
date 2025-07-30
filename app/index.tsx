import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Handle Android hardware back button
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // prevent default behavior
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
    <StatusBar style="dark" backgroundColor="#000000" />
      {/* Optional In-App Back Button */}
      
      {/* {canGoBack && (
        <TouchableOpacity style={styles.backButton} onPress={() => webViewRef.current && webViewRef.current.goBack()}>
          <Text style={styles.backButtonText}> ← Go Back </Text>
        </TouchableOpacity>
      )} */}
      

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://103.250.160.75:5003/login' }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowFileAccessFromFileURLs={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // backButton: {
  //   position: "absolute",
  //   top: Platform.OS === "ios" ? 50 : 20,
  //   left: 10,
  //   zIndex: 10,
  //   backgroundColor: "#ffffffdd",
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  //   borderRadius: 8,
  // },
  // backButtonText: {
  //   color: "black",
  //   fontSize: 16,
  // },
});

