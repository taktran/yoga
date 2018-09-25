import { POSENET_IDS } from '../constants';
const {
  LEFT_WRIST,
  RIGHT_WRIST,
  LEFT_ANKLE,
  RIGHT_ANKLE
} = POSENET_IDS;

const PREPARATION_POSE_ANKLE_MIN_DISTANCE = 100;
const PREPARATION_POSE_ANKLE_MAX_DISTANCE = 150;
const MOUNTAIN_POSE_WRIST_DISTANCE = 65;

export default function createPoseDetection(nodes = []) {
  const leftWrist = nodes.find(({ id }) => id === LEFT_WRIST);
  const rightWrist = nodes.find(({ id }) => id === RIGHT_WRIST);
  const leftAnkle = nodes.find(({ id }) => id === LEFT_ANKLE);
  const rightAnkle = nodes.find(({ id }) => id === RIGHT_ANKLE);

  const hasMountainPose = () => {
    if (!leftWrist || !rightWrist) { return false; }
    
    const { x: leftX, y: leftY } = leftWrist;
    const { x: rightX, y: rightY } = rightWrist;
    const distanceBetweenWrists = Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(rightY - leftY, 2));

    const isPose = distanceBetweenWrists < MOUNTAIN_POSE_WRIST_DISTANCE;

    return isPose;
  };

  const hasPreparationPose = () => {
    if (!leftAnkle || !rightAnkle) { return false; }
    
    const { x: leftX, y: leftY } = leftAnkle;
    const { x: rightX, y: rightY } = rightAnkle;
    const distanceBetweenAnkles = Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(rightY - leftY, 2));

    const isPose = (distanceBetweenAnkles > PREPARATION_POSE_ANKLE_MIN_DISTANCE) && (distanceBetweenAnkles < PREPARATION_POSE_ANKLE_MAX_DISTANCE);

    return isPose;
  };

  return {
    hasMountainPose,
    hasPreparationPose
  };
};
