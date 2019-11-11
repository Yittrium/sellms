
//密码
export const pwdReg = () => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,8}$/;

const validatePwd = (rule, value, callback) => {
    //rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
    if (value === "") {
        callback(new Error("请输入密码！"));
    } else if (!rule.pattern.test(value)) {
        callback(new Error("密码3~8位，必须包括数字和字母！"));
    } else {
        callback();
    }
};
export const checkpwd = [{ validator: validatePwd, pattern: pwdReg(), trigger: "blur" }];


//账号
export const checkacc = [
    { required: true, message: "账号不能为空！", trigger: "blur" },
    { min: 2, max: 11, message: "账号2~11位", trigger: "blur" }
];


//手机号
const telReg = () => /^1[3456789]\d{9}$/;
const validateTel = (rule, value, callback) => {
    //rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
    if (value === "") {
        callback(new Error("请输入手机号！"));
    } else if (!rule.pattern.test(value)) {
        callback(new Error("手机号不合法！"));
    } else {
        callback();
    }
};
export const checktel = [{ validator: validateTel, pattern: telReg(), trigger: "blur" }];


//订单号   纯数字5-12位
const numReg = () => /^\d{5,12}$/;
const validateNum = (rule, value, callback) => {
    //rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
    if (value === "") {
        callback(new Error(`请输入订单号！`));
    } else if (!rule.pattern.test(value)) {
        callback(new Error(`订单号为5~12位纯数字！`));
    } else {
        callback();
    }
};
export const checkNum = [{ validator: validateNum, pattern: numReg(), trigger: "blur" }];

//金额
const amountReg = () => /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
const validateamount = (rule, value, callback) => {
    //rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
    if (value === "") {
        callback(new Error(`请输入金额！`));
    } else if (!rule.pattern.test(value)) {
        callback(new Error(`金额为最多两位小数的非负数!`));
    } else {
        callback();
    }
};
export const checkamount = [{ validator: validateamount, pattern: amountReg(), trigger: "blur" }];







