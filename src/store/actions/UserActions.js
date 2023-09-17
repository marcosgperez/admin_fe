import React from "react";
export const IDENTIFY_ME = "[identify me action] confirmed signup";
export const IDENTIFY_ME_FAILED = "[identify me failed action] failed signup";


export function identifyMe(data) {
  return {
    type: IDENTIFY_ME,
    payload: data,
  };
}

export function identifyMeFailed(data) {
  return {
    type: IDENTIFY_ME_FAILED,
    payload: data,
  };
}
