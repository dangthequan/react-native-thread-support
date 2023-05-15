package com.threadsupport;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.app.Activity;

@ReactModule(name = ThreadSupportModule.NAME)
public class ThreadSupportModule extends ReactContextBaseJavaModule {
  public static final String NAME = "ThreadSupport";

  public ThreadSupportModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
  
  @ReactMethod
  public void dispatch(final Callback callback) {
    new Thread(new Runnable() {
        @Override
        public void run() {
            callback.invoke("");
        }
    }).start();
  }

  @ReactMethod
  public void dispatchOnMainThread(final Callback callback) {
    Activity activity = getCurrentActivity();
    if (activity != null) {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                callback.invoke("");
            }
        });
    }
  }
}
