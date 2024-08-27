export function extractUrlPathSegment(url: string, segmentIndex: number) {
  const urlObject = new URL(url);
  const path = urlObject.pathname;
  const segments = path.split('/');
  const nonEmptySegments = segments.filter(Boolean);

  if (segmentIndex < 0) {
    segmentIndex = nonEmptySegments.length + segmentIndex;
  }

  if (segmentIndex >= 0 && segmentIndex < segments.length) {
    return nonEmptySegments[segmentIndex];
  }

  throw new Error('Path segment does not exist');
}
