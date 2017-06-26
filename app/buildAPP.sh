#!/bin/bash

export PATH=$PATH:/usr/local/android-sdk
export PATH=$PATH:/usr/local/android-sdk/tools
export PATH=$PATH:/usr/local/android-sdk/tools/bin
export PATH=$PATH:/usr/local/android-sdk/platform-tools
export PATH=$PATH:/usr/local/android-sdk/build-tools
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_131/
export ANDROID_HOME=/usr/local/android-sdk/

cd /home/jfolpf/autocosts/app/

./buildHTML.sh buildAPP

cd autocosts/

cordova build
cordova emulate --target=avd android

mv platforms/android/build/outputs/apk/android-debug.apk /home/jfolpf/

cd "$(dirname "$0")"


