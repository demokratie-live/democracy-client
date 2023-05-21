#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <UserNotifications/UNUserNotificationCenter.h>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
