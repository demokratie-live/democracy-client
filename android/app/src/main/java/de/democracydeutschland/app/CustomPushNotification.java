package de.democracydeutschland.app;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;

import de.democracydeutschland.app.R;

import com.wix.reactnativenotifications.core.AppLaunchHelper;
import com.wix.reactnativenotifications.core.AppLifecycleFacade;
import com.wix.reactnativenotifications.core.JsIOHelper;
import com.wix.reactnativenotifications.core.notification.PushNotification;



public class CustomPushNotification extends PushNotification {

    public CustomPushNotification(Context context, Bundle bundle, AppLifecycleFacade appLifecycleFacade, AppLaunchHelper appLaunchHelper, JsIOHelper jsIoHelper) {
        super(context, bundle, appLifecycleFacade, appLaunchHelper, jsIoHelper);
    }

    @Override
    protected Notification.Builder getNotificationBuilder(PendingIntent intent) {
        final Resources resources = mContext.getResources();

        // First, get a builder initialized with defaults from the core class.
        final Notification.Builder builder = super.getNotificationBuilder(intent);

        // Set our custom overrides --

        // Enable 'extended' layout (extends on down-stroke gesture):
        final Notification.BigTextStyle extendedNotificationStyle =
                new Notification.BigTextStyle()
                        .bigText(mNotificationProps.getBody()); // "4:15 - 5:15 PM\nBig Conference Room"
        builder.setStyle(extendedNotificationStyle);

        // Set custom-action icon.
        builder.setSmallIcon(R.drawable.ic_notification)
                .setColor(resources.getColor(R.color.pushIcon)); // Blue-ish

        return builder;
    }
}