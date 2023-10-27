import { orders } from "../db"

import { getProductbyId } from "./productsUtil"

export const getOrdersExpanded = (orderList) => {
    const expandedOrders = orderList.map((order) => {
        const orderWithItems = order.itemsId.map((proId) => getProductbyId(proId))
        return {...order,orderWithItems}
    })
    return expandedOrders
}

export const getOrdersForUsedId = (usrId) => {
    const ordersList = orders.filter((order) => order.userId === usrId)
    return ordersList
}

export const getOrdersExpandedForUserId = async (userId) => {
    const ordersForThisUser = await getOrdersForUsedId(userId);
    //console.log("ordersForThisUser", ordersForThisUser)
    const getOrdersExpandedList = await getOrdersExpanded(ordersForThisUser);
    //console.log("getOrdersExpandedList", JSON.stringify(getOrdersExpandedList))
    return getOrdersExpandedList;
}