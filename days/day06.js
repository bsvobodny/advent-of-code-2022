const PACKET_MARKER_SIZE = 4;
const MESSAGE_MARKER_SIZE = 14;

const day6 = (input) => {
  return {
    packetMarkerPosition: getMarkerPosition(input),
    messageMarkerPosition: getMarkerPosition(input, MESSAGE_MARKER_SIZE),
  };
};

const getMarkerPosition = (input, markerSize = PACKET_MARKER_SIZE) => {
  const chars = input.split("");
  let i = 0;
  for (i = 0; i < chars.length - 4; i++) {
    const isMarker = checkUnicity(chars.slice(i, i + markerSize));
    if (isMarker) {
      break;
    }
  }
  return i + markerSize;
};

const checkUnicity = (marker) => {
  const filtered = marker.filter(
    (c) => marker.filter((char) => char === c).length === 1
  );
  return filtered.length === marker.length;
};

module.exports = { day6, getMarkerPosition };
