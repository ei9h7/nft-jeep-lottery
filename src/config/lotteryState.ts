const state: { [key: string]: string } = {
  WaitingForLINK: "Coming soon",
  WaitingForParticipationPeriod: "Coming soon",
  OngoingParticipationPeriod: "Building Period",
  OngoingPreparationPeriod: "Upgrade your Jeep",
  WaitingForNextEvent: "Waiting for next event",
  WaitingForFundsRelease: "Funds release",
  Complete: "Winner has been Chosen!",
};

export default Object.keys(state).map((val: string) => {
  return state[val];
});
