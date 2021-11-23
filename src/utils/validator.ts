export const validatePhoneNumber = (phoneNum: string) => {
  const phoneREg = /^1[3-9]\d{9}$/
  return phoneREg.test(phoneNum) ? true : false
}
