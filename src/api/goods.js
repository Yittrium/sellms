import req from "@/utils/request";


// 表格
export const $getGoodsList = params => req.get("/goods/goodslist", params)

//添加
export const $goodsAdd = params => req.post("/goods/goodsadd", params)

//删除
export const $goodsDel = params => req.get("/goods/goodsdel", params)

//修改
export const $goodsEdit = params => req.post("/goods/goodsedit", params)





