import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-thread-support' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ThreadSupport = NativeModules.ThreadSupport
  ? NativeModules.ThreadSupport
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function dispatch(callback:Function) {
  ThreadSupport.dispatch(callback);
}

export function dispatchOnMainThread(callback:Function) {
  ThreadSupport.dispatchOnMainThread(callback);
}
