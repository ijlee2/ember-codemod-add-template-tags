type PackageVersion = string;
type PackageVersions = [number, number, number];

function parse(
  version: PackageVersion | undefined,
): PackageVersions | undefined {
  if (version === undefined) {
    return;
  }

  const regex = new RegExp(/^(\^|~)?(\d+(\.\d+)?(\.\d+)?).*/);
  const matches = version.match(regex);

  if (!matches) {
    return;
  }

  const [majorVersion, minorVersion, patchVersion] = matches[2]!.split('.') as [
    string,
    string,
    string,
  ];

  return [
    Number(majorVersion),
    Number(minorVersion ?? 0),
    Number(patchVersion ?? 0),
  ];
}

export function isRecent(
  currentVersion: PackageVersion | undefined,
  targetVersion: PackageVersion,
): boolean {
  const currentVersions = parse(currentVersion);
  const targetVersions = parse(targetVersion);

  if (currentVersions === undefined || targetVersions === undefined) {
    return false;
  }

  if (currentVersions[0] > targetVersions[0]) {
    return true;
  }

  if (currentVersions[0] < targetVersions[0]) {
    return false;
  }

  if (currentVersions[1] > targetVersions[1]) {
    return true;
  }

  if (currentVersions[1] < targetVersions[1]) {
    return false;
  }

  return currentVersions[2] >= targetVersions[2];
}
