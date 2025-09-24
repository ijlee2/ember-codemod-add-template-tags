export type PackageVersion = string;

function parse(version?: PackageVersion): [number, number] | undefined {
  if (version === undefined) {
    return;
  }

  const regex = new RegExp(/^(\^|~)?(\d+(\.\d+)?).*/);
  const matches = version.match(regex);

  if (!matches) {
    return;
  }

  const [majorVersion, minorVersion] = matches[2]!.split('.') as [
    string,
    string,
  ];

  return [Number(majorVersion), Number(minorVersion ?? 0)];
}

export function isEmberSourceRecent(version?: PackageVersion): boolean {
  const versions = parse(version);

  if (versions === undefined) {
    return false;
  }

  const [majorVersion, minorVersion] = versions;

  if (majorVersion < 6) {
    return false;
  }

  if (majorVersion === 6 && minorVersion < 4) {
    return false;
  }

  return true;
}
