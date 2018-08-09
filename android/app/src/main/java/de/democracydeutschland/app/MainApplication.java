package de.democracydeutschland.app;

import android.content.Context;
import android.os.Bundle;

import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.sha256lib.Sha256Package;
import com.oblador.keychain.KeychainPackage;

import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.wix.reactnativenotifications.core.AppLaunchHelper;
import com.wix.reactnativenotifications.core.AppLifecycleFacade;
import com.wix.reactnativenotifications.core.JsIOHelper;
import com.wix.reactnativenotifications.core.notification.INotificationsApplication;
import com.wix.reactnativenotifications.core.notification.IPushNotification;

public class MainApplication extends NavigationApplication {

    /**
     * FOR PUSH START
     */
    /*
    private NotificationsLifecycleFacade notificationsLifecycleFacade;

    @Override
  	public void onCreate() {
    	super.onCreate();
    	SoLoader.init(this,  false);

    	// Create an object of the custom facade impl
    	notificationsLifecycleFacade = new NotificationsLifecycleFacade();
    	// Attach it to react-native-navigation
    	//setActivityCallbacks(notificationsLifecycleFacade);
  	}

  	@Override
  	public IPushNotification getPushNotification(Context context, Bundle bundle, AppLifecycleFacade defaultFacade, AppLaunchHelper defaultAppLaunchHelper) {
    	return new CustomPushNotification(
            context,
            bundle,
            notificationsLifecycleFacade, // Instead of defaultFacade!!!
            defaultAppLaunchHelper,
            new JsIOHelper()
    	);
  	}
  	*/
    /**
     * FOR PUSH END
     */

	@Override
	public boolean isDebug() {
		return BuildConfig.DEBUG;
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return Arrays.<ReactPackage>asList(
				new RNNotificationsPackage(MainApplication.this),
				new RCTPdfView(),
				new RNFetchBlobPackage(),
				new SvgPackage(),
				new RNDeviceInfo(),
				new ReactNativeConfigPackage(),
				new VectorIconsPackage(),
				new LinearGradientPackage(),
				new Sha256Package(),
				new KeychainPackage()
		);
	}

  	/*
  	@Override
  	public String getJSMainModuleName() {
    	return "index";
  	}
  	*/

	@Override
	protected ReactNativeHost createReactNativeHost() {
		return new NavigationReactNativeHost(this) {
			@Override
			protected String getJSMainModuleName() {
				return "index";
			}
		};
	}
};
