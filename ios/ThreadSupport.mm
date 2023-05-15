#import "ThreadSupport.h"

@implementation ThreadSupport
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(dispatch:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_global_queue( DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void){
    callback(@[]);
  });
}

RCT_EXPORT_METHOD(dispatchOnMainThread:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^(void){
    callback(@[]);
  });
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeThreadSupportSpecJSI>(params);
}
#endif

@end
