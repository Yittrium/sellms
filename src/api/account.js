import req from "@/utils/request";


//添加账号
export const $addAccound = params => req.post("/addAccound", params)

//登录
export const $login = params => req.post("/login", params)

//列表
export const $accList = params => req.get("/accList", params)

//删除
export const $accDel = params => req.get("/accountdel", params)
//批量删除
export const $accDels = params => req.get("/accountdels", params)
//编辑
export const $editAcc = params => req.post("/accountedit", params)
//重置密码
export const $resetPwd = params => req.get("/resetpwd", params)

//修改密码
export const $editPassword = params => req.post("/passwordedit", params)
//检查旧密码
export const $checkOldPwd = params => req.get("/checkoldpwd", params)


//personal
export const $personal = params => req.get("/personal", params)
//修改头像
export const $personalimg = params => req.get("/avataredit", params)

//检查账号是否重复
//export const $accCheck = params => req.get("/checkacc", params) 