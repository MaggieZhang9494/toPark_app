export default {
  name:/^[\u4E00-\u9FA5\(\)\（\）A-Za-z0-9]{1,50}$/,
  password:/\w{6,18}/,
  newPassword:/\w{6,18}/,
  passwordConfirm:/\w{6,18}/,
  mobile:/^[0-9]{11}$/,
}
