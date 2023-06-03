import { RootState } from "../reducers";
import { AllocationState } from "./types";

export const selectActiveAllocation = (state: RootState) => {
  const { list = [], activeAllocationId = "" } =
    state.allocation as AllocationState;

  return list.find((allocation) => allocation.id === activeAllocationId) || {};
};
