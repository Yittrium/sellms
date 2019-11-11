import req from "@/utils/request";




//表格&查询&分页
export const $orderList = params => req.get("/order/orderlist", params)
//编辑回填
export const $orderDetail= params => req.get("/order/orderdetail", params)

//保存编辑
export const $orderEdit = params => req.post("/order/orderedit", params)