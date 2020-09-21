export default {
    name:/^[\u4E00-\u9FA5\(\)\（\）A-Za-z0-9]{1,50}$/,
    password:/\w{6,18}/,
    newPassword:/\w{6,18}/,
    passwordConfirm:/\w{6,18}/,
    mobile:/^[0-9]{11}$/,
    unifiedSocialCreditCode: /^[^_IOZSVa-z\W]{16,18}$/,
    legalRepresentativeIdentityCode: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    legalRepresentativeName: /^[\u4E00-\u9FA5]{1,5}$/,
}
