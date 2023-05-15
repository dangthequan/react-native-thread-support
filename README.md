# react-native-thread-support
The tiny thread library supports running code in background thread &amp; UI thread on react native platform.

## Installation
Use below command to install
```
npm i react-native-thread-support --save
```

## Usage

To import into your project, use below code: 

```
import { dispatch, dispatchOnMainThread } from "react-native-thread-support";
```

Use dispatch and dispatchOnMainThread to wrap your tasks in corresponding threads:

```
fetchNews() {
    dispatch(() => {
        // Do long running task on background such as requesting api task, querying local sqlite database task...)
        let api = new RestAPI(); // Use RestAPI class to request api for example
        api.fetchNews().then(({status, data}) => {
            // Do task in main thread to update UI.
            dispatchOnMainThread(() => {
                if (status === 200) {
                    // Do ui task
                    this.setState({
                        news: data || [],
                        loading: false
                    });
                }
                else {
                    // Update failure UI such as showing error, hiding loading indicator...
                }
             });
        }).then((exception) => {
            // Handle exception
        });
    });
}
```
