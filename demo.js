const bot=require("./index");

bot.on("message",context=>{
    console.log(context);
    bot("send_msg",{...context,message:"【dingbot test reply!】"+context.message});
});

bot("send_group_msg",{
    group:"https://oapi.dingtalk.com/robot/send?access_token=95b5388736bf0a4e610458a4a4b8aa8fd6d01c6a80170d10a4f142ec965633ca",
    message:"【dingbot test on!】",
})

bot.listen(8080);
/*

curl 'https://oapi.dingtalk.com/robot/send?access_token=95b5388736bf0a4e610458a4a4b8aa8fd6d01c6a80170d10a4f142ec965633ca' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text","text": {"content": "【】我就是我, 是不一样的烟火"}}'



 */
