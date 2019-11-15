import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as PXBThemes from '@pxblue/themes/react-native';
import { ThemeProvider, Body, Subtitle } from '@pxblue/react-native-components';
import * as Font from 'expo-font';
import * as Colors from '@pxblue/colors'
import { ListItem, Text, Icon } from 'react-native-elements';
import data from './data';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const HEADER_EXPANDED_HEIGHT = 200 + getStatusBarHeight();
const HEADER_COLLAPSED_HEIGHT = 56 + getStatusBarHeight();

const lincoln = require('./assets/lincoln.jpg');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      fontLoaded: false
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Extrabold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.container}>

        <StatusBar barStyle={'light-content'} />
        <AnimatedSafeAreaView style={[styles.bar, { height: headerHeight, paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0 }]}>
          <Animated.Image
            source={lincoln}
            resizeMethod={'resize'}
            style={[styles.image, {
              height: headerHeight,
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
                outputRange: [0.3, 0]
              })
            }]}
          />
          <Animated.View style={[this.contentStyle()]}>
            <View style={{ marginRight: 32 }}>
              <Icon name={'menu'} size={24} color={Colors.white[50]} />
            </View>
            <View style={{ flex: 0, justifyContent: 'center' }}>
              <Animated.Text
                style={this.titleStyle()}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {'President'}
              </Animated.Text>
              <Animated.Text
                style={this.infoStyle()}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {'Commander in Chief'}
              </Animated.Text>
              <Animated.Text
                style={this.subtitleStyle()}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {'Leader of the free world'}
              </Animated.Text>
            </View>

          </Animated.View>
        </AnimatedSafeAreaView>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY,
                },
              },
            },
          ])}
          scrollEventThrottle={16}
        >
          <ThemeProvider theme={PXBThemes.blue}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <ListItem
                  containerStyle={{ paddingHorizontal: 16 }}
                  title={<Body style={{ marginLeft: 16 }} font={'semiBold'}>{item.president}</Body>}
                  subtitle={(<View style={{ marginLeft: 16 }}>
                    <Subtitle style={{ color: Colors.gray[500] }} font={'regular'}>{item.party}</Subtitle>
                    <Subtitle style={{ color: Colors.gray[500] }} font={'regular'}>{item.took_office}</Subtitle>
                  </View>)}
                  leftIcon={{ name: 'person', color: Colors.gray[500], iconStyle: { marginRight: 16 } }}
                />
              )}
            />
          </ThemeProvider>
        </ScrollView>
        <SafeAreaView></SafeAreaView>
      </View >

    );
  }
  titleStyle() {
    return {
      color: 'white',
      lineHeight: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [30, 20],
        extrapolate: 'clamp',
      }),
      fontSize: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [30, 20],
        extrapolate: 'clamp',
      }),
    };
  }
  subtitleStyle() {
    return {
      color: 'white',
      lineHeight: 18,
      fontSize: 18,
    };
  }
  infoStyle() {
    return {
      color: 'white',
      lineHeight: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [20, 0.1],
        extrapolate: 'clamp',
      }),
      opacity: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      fontSize: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [20, 0.1],
        extrapolate: 'clamp',
      }),
    };
  }

  contentStyle() {
    return [styles.content, {
      paddingBottom: this.state.scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [28, 12],
        extrapolate: 'clamp',
      })
    }];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 0,
    backgroundColor: Colors.blue[500]
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  scrollContainer: {
    paddingTop: HEADER_EXPANDED_HEIGHT
  },
  image: {
    position: 'absolute',
    right: 0,
    width: '50%',
    resizeMode: 'cover'
  }
});
export default App;