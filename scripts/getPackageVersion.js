function getPackageVersion() {
  // get version properties from package.json
  const pckg = require('../package.json');
  const version = pckg.version.replace(/\-[a-z]+$/, '');
  const build = parseInt(pckg['version-build']);

  // compute CFBundleVersion
  const [major, minor, patch] = version.split('.').map(s => parseInt(s));
  const bundleVersion = major * 1000000 + minor * 10000 + patch * 100 + build;

  return {version, bundleVersion};
}

module.exports = getPackageVersion;
