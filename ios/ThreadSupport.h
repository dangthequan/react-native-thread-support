
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNThreadSupportSpec.h"

@interface ThreadSupport : NSObject <NativeThreadSupportSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ThreadSupport : NSObject <RCTBridgeModule>
#endif

@end
