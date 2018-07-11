package de.democracydeutschland.app;

import android.app.Application;
import android.content.Context;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.horcrux.svg.SvgPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

import com.BV.LinearGradient.LinearGradientPackage;
import com.sha256lib.Sha256Package;
import com.oblador.keychain.KeychainPackage;

import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.wix.reactnativenotifications.core.AppLaunchHelper;
import com.wix.reactnativenotifications.core.AppLifecycleFacade;
import com.wix.reactnativenotifications.core.JsIOHelper;
import com.wix.reactnativenotifications.core.notification.INotificationsApplication;
import com.wix.reactnativenotifications.core.notification.IPushNotification;

public class MainApplication extends NavigationApplication implements INotificationsApplication {

    /**
     * FOR PUSH START
     */
    private NotificationsLifecycleFacade notificationsLifecycleFacade;

    @Override
  	public void onCreate() {
    	super.onCreate();
    	SoLoader.init(this, /* native exopackage */ false);

    	// Create an object of the custom facade impl
    	notificationsLifecycleFacade = new NotificationsLifecycleFacade();
    	// Attach it to react-native-navigation
    	setActivityCallbacks(notificationsLifecycleFacade);
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
    /**
     * FOR PUSH END
     */

	@Override
  	public boolean isDebug() {
    	// Make sure you are using BuildConfig from your own application
    	return BuildConfig.DEBUG;
  	}

    // @Override
    protected List<ReactPackage> getPackages() {
    	// Add additional packages you require here
    	// No need to add RnnPackage and MainReactPackage
      	return Arrays.<ReactPackage>asList(
      		//new MainReactPackage(),
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

    @Override
  	public List<ReactPackage> createAdditionalReactPackages() {
    	return getPackages();
  	}

  	@Override
  	public String getJSMainModuleName() {
    	return "index";
  	}

  	/*@Override
  	public ReactNativeHost getReactNativeHost() {
    	return mReactNativeHost;
  	}*/
};
