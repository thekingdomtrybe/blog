/* eslint-disable import/prefer-default-export */
export const CAN_USE_DOM = typeof window !== 'undefined'
  && typeof window.document !== 'undefined'
  && typeof window.document.createElement !== 'undefined';
