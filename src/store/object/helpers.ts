export const addPropToObject = ({
  objectPayload,
  allocationId,
  lookupHash,
  state,
}) => {
  const allocationObject = { ...state.allocationsFilesMap[allocationId] }

  allocationObject[lookupHash] = {
    ...allocationObject[lookupHash],
    ...objectPayload,
  }

  return {
    ...state.allocationsFilesMap,
    [allocationId]: allocationObject,
  }
}
