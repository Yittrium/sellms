import req from "@/utils/request";



//编辑回填
export const $shopinfo= params => req.get("/shop/shopinfo", params)

//保存编辑
export const $shopedit = params => req.post("/shop/shopedit", params)

