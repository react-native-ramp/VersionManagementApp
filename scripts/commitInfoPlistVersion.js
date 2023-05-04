async function commitInfoPlistVersion() {
  const getPackageVersion = require('./getPackageVersion');
  const {version, bundleVersion} = getPackageVersion();

  // commit Info.plist file and add versions to the commit message
  const cp = require('child_process');
  const commit_msg = `chore(version): Bump to ${version}(${bundleVersion})`;
  const cmd = [
    'git add ios/VersionManagementApp/Info.plist',
    '&&',
    `git commit -m "${commit_msg}"`,
  ].join(' ');
  const child = cp.exec(cmd, error => {
    const msg = error ? `exec ERROR : ${error}` : `Git Commit : ${commit_msg}`;
    console.log(msg);
  });
  await new Promise(resolve => child.on('close', resolve));
}

commitInfoPlistVersion();
