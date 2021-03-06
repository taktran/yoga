export const COLORS = {
  oxford: '#0F5499',
  claret: '#990F3D',
  sky: '#CCE6FF'
};

export const POSENET_THROTTLE = 5000;

export const VIDEO_SIZE = 600;
export const POSENET_IDS = {
  LEFT_WRIST: 'leftWrist',
  RIGHT_WRIST: 'rightWrist',
  LEFT_ANKLE: 'leftAnkle',
  RIGHT_ANKLE: 'rightAnkle'
};

export const POSENET_NODES = [
  {
    id: 'nose',
    r: 50,
    color: COLORS.oxford
  },
  // { id: 'leftShoulder', r: 5 },
  // { id: 'rightShoulder', r: 5 },
  // { id: 'leftElbow', r: 5 },
  // { id: 'rightElbow', r: 5 },
  {
    id: POSENET_IDS.LEFT_WRIST,
    r: 25,
    color: COLORS.claret,
    label: 'left'
  },
  {
    id: POSENET_IDS.RIGHT_WRIST,
    r: 25,
    color: COLORS.claret,
    label: 'right'
  },
  // { id: 'leftHip', r: 5 },
  // { id: 'rightHip', r: 5 },
  // { id: 'leftKnee', r: 5 },
  // { id: 'rightKnee', r: 5 },
  {
    id: POSENET_IDS.LEFT_ANKLE,
    r: 25,
    color: COLORS.sky,
    label: 'left'
  },
  {
    id: POSENET_IDS.RIGHT_ANKLE,
    r: 25,
    color: COLORS.sky,
    label: 'right'
  },
];
