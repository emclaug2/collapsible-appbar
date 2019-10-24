import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Colors from '@pxblue/colors'
import { Header, ListItem, Text, Icon, colors } from 'react-native-elements';
import data from './data';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const HEADER_EXPANDED_HEIGHT = 200 + getStatusBarHeight(true);
const HEADER_COLLAPSED_HEIGHT = 56 + getStatusBarHeight(true);
const { width: SCREEN_WIDTH } = Dimensions.get("screen")

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }
  titleStyle() {
    const { theme } = this.props;
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
    const { theme } = this.props;
    return {
      color: 'white',
      lineHeight: 18,
      fontSize: 18,
    };
  }
  infoStyle() {
    const { theme } = this.props;
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

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.container}>

        <StatusBar barStyle={'light-content'} />
        <AnimatedSafeAreaView style={[styles.bar, { height: headerHeight }]}>
          <Animated.Image
            source={{ url: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg" }}
            resizeMethod={'resize'}
            style={{
              position: 'absolute',
              right: 0,
              width: '50%',
              resizeMode: 'cover',
              height: headerHeight,
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
                outputRange: [0.3, 0]
              })
            }}
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
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <ListItem
                title={item.president}
                subtitle={(<View >
                  <Text style={{ color: Colors.gray[500] }}>{item.party}</Text>
                  <Text style={{ color: Colors.gray[500] }}>{item.took_office}</Text>
                </View>)}
                subtitleStyle={{ color: Colors.gray[500] }}
                leftIcon={{ name: 'person', color: Colors.gray[500] }}
              />
            )}
          />

        </ScrollView>
        <SafeAreaView></SafeAreaView>
      </View >

    );
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
    zIndex: 9999,
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
    padding: 10,
    paddingTop: HEADER_EXPANDED_HEIGHT
  },
});
