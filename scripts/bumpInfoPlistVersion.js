async function bumpInfoPlistVersion() {
  const getPackageVersion = require('./getPackageVersion');
  const {version, bundleVersion} = getPackageVersion();

  // update Info.plist file
  const cp = require('child_process');
  const cmd = [
    '/usr/libexec/PlistBuddy',
    `-c "Set :CFBundleVersion ${bundleVersion}"`,
    `-c "Set :CFBundleShortVersionString ${version}"`,
    'ios/VersionManagementApp/Info.plist',
  ].join(' ');
  const child = cp.exec(cmd, error => {
    const msg = error
      ? `exec ERROR : ${error}`
      : `Info.plist updated to version ${version}(${bundleVersion})`;
    console.log(msg);
  });
  await new Promise(resolve => child.on('close', resolve));
}

bumpInfoPlistVersion();
