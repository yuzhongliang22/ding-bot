const bot=require("./index");

bot.on("message",context=>{
    console.log(context);
    bot("send_msg",{...context,message:"【dingbot test reply!】"+context.message});
});

bot("send_group_msg",{
    group:"https://oapi.dingtalk.com/robot/send?access_token=95b5388736bf0a4e610458a4a4b8aa8fd6d01c6a80170d10a4f142ec965633ca",
    message:"【dingbot test on!】",
})
// bot("send_group_msg",{
//     group:"https://oapi.dingtalk.com/robot/send?access_token=95b5388736bf0a4e610458a4a4b8aa8fd6d01c6a80170d10a4f142ec965633ca",
//     message:{
//         "msgtype": "actionCard",
//         "actionCard": {
//             "title": "【】打造一间咖啡厅",
//             "text": "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划",
//             "singleTitle" : "阅读全文",
//             "singleURL" : "https://www.dingtalk.com/"
//         }
//     }
// })

bot.listen(8080);
