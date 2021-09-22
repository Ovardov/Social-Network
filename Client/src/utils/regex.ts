/* eslint-disable no-useless-escape */
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const nameRegex = /^\b(?=.{2,40}$)[a-zA-Z-' \.]+$/;
export const usernameRegex = /^[A-Za-z0-9_\-\.]{3,25}$/;
export const interestRegex = /^[A-Za-z\s]{3,30}$/;