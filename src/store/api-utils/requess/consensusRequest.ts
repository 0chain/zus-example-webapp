import * as BluebirdPromise from "bluebird";

import { reduceArrayToRandomElements, getConsensusElement } from "lib/utils";
import { basicGetRequest, basicPostRequest } from "./basicRequests";
import { handleJsonResp } from "./respHandlers";

const handleBluebirdResp =
  (consensusThreshold = 0.5) =>
  async (respArray) => {
    const consensusElement = getConsensusElement(respArray, consensusThreshold);

    if (!consensusElement) throw new Error("No consensus was reached");

    return consensusElement;
  };

// TODO: write tests to confirm accuracy and resilience on various scenarios
const executeRequest = async (reqProps, consensusParams) => {
  const { urls, endpoint, payload, params = {} } = reqProps;

  const reqUrls = urls.map((url) => {
    const newUrl = new URL(url + endpoint);
    for (const key in params) newUrl.searchParams.append(key, params[key]);
    return newUrl;
  });

  const reqMethod = payload ? basicPostRequest : basicGetRequest;
  const promises = reqUrls.map((url) =>
    reqMethod(url, payload)
      .then(handleJsonResp)
      .catch((error) => ({ error }))
  );

  const { nodesToWaitFor, threshold } = consensusParams;

  return await BluebirdPromise.some(promises, nodesToWaitFor)
    .then(handleBluebirdResp(threshold))
    .then((data) => ({ data }))
    .catch(BluebirdPromise.AggregateError, (errors) => ({ error: errors[0] }))
    .catch((error) => ({ error }));
};

// As per https://github.com/0chain/0chain/wiki/fetching
// considering 100 nodes, and that 1/4 are byzantine,
// if we get consensus from more than half of 15 node requests,
// the probability of an accurate response is 99%
// we add 35% more nodes to the Promises count to compensate for slow responders,
// which will be ignored by Bluebird
const nodesPerHundred = 15;

// Function to select random nodes from url array,
// and to calculate nodesToWaitFor based on above constant
/**
 * @param {array} urls,
 * @param {string} endpoint,
 * @param {object} payload, // optional
 * @param {object} params,// optional
 */
export const consensusRequest = async (props) => {
  const { urls } = props;

  if (!urls?.length) return { error: "Valid urls must be provided" };

  const rawNodesQty = urls.length * (nodesPerHundred / 100);
  const randomNodesToQuery = Math.ceil(rawNodesQty * 1.35);
  const nodesToWaitFor = Math.ceil(rawNodesQty);

  const randomUrls = reduceArrayToRandomElements(
    urls,
    Math.ceil(randomNodesToQuery)
  );

  const reqProps = { ...props, urls: randomUrls };

  return await executeRequest(reqProps, { nodesToWaitFor });
};

// Params are the same as consensusRequest above
export const simpleConsensus = async (reqProps) => {
  const { urls } = reqProps;

  if (!urls?.length) return { error: "Valid urls must be provided" };

  const consensusParams = {
    // The executeRequest function call below will query all urls provided,
    // but prop is set to 75% of nodes so request is not delayed by late responders
    nodesToWaitFor: Math.ceil(urls.length * 0.75),
    threshold: 0.6,
  };

  return await executeRequest(reqProps, consensusParams);
};

// Function to requests all nodes from urls array.
// Params are the same as consensusRequests above
export const requestAllNodes = async (reqProps) => {
  const { urls } = reqProps;

  if (!urls.length) return { error: "Valid urls must be provided" };

  // ensures all nodes have processed the request and are in consensus
  const consensusParams = {
    nodesToWaitFor: urls.length,
    threshold: 1,
  };

  return await executeRequest(reqProps, consensusParams);
};
