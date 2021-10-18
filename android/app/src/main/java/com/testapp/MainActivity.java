package com.testapp;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.reactnativedengage.DengageRNCoordinator;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "testApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // These three lines need to be added
    DengageRNCoordinator coordinator = DengageRNCoordinator.Companion.getSharedInstance();
    coordinator.injectReactInstanceManager(getReactInstanceManager());
    coordinator.setupDengage(
            true,
            "b84p3_p_l_wtgsvIHcPHnvTZIpX_s_l_Un7Iib2TLUBn6ILLxl_p_l_2ewbYdVKi7udHHp_p_l_RLypAdUu82jL67mLlrhZ27q7v2k0Lk1Dhc8HvpvwV9uC4zVb69bihjL_s_l_OyD69Aj_s_l_kZO9t",
            null,
            getApplicationContext()
    );
  }
}
