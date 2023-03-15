import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as StatusBar from 'expo-status-bar';


export default class Main extends Component{
  constructor(props) {
    super(props) 
    this.state = {
        hasCameraPermission: null,
        faces: []
    }
  }
}


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        };

        this.onFacesDetected = this.onFacesDetected.bind(this);

    }

    async componentDidMount(){
      const { status } = await Camera.requestPermissionAsync();
      this.setState({ hasCameraPermission: status === "granted"});
    }

    onFacesDetected({ faces }) {
      this.setState({ faces:faces });
      
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({ hasCameraPermission: status.status === 'granted' })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>FRAPP</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                </View>
                <View style={styles.filterContainer}>

                </View>
                <View style={styles.actionContainer}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  UpperContainer: AppName 
  MiddleContainer: CameraSection
  LowerContainer: ActionSection
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});