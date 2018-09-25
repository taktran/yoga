import { POSENET_IDS } from '../constants';
const {
  LEFT_WRIST,
  RIGHT_WRIST
} = POSENET_IDS;

const MOUNTAIN_POSE_WRIST_DISTANCE = 65;

export default function createPoseDetection(nodes = []) {
  const leftWrist = nodes.find(({ id }) => id === LEFT_WRIST);
  const rightWrist = nodes.find(({ id }) => id === RIGHT_WRIST);

  const hasMountainPose = () => {
    if (!leftWrist || !rightWrist) { return false; }
    
    const { x: leftX, y: leftY } = leftWrist;
    const { x: rightX, y: rightY } = rightWrist;
    const distanceBetweenWrists = Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(rightY - leftY, 2));

    const isPose = distanceBetweenWrists < MOUNTAIN_POSE_WRIST_DISTANCE;

    return isPose;
  };

  return {
    hasMountainPose
  };
};
