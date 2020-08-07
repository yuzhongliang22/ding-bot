const koa=require("koa");
const bodyparser=require("koa-bodyparser");
const axios=require("axios");


let app=new koa();

const _bot={};

const onList=[];

app.use(bodyparser());

app.use(async (ctx,next)=>{
    onList.forEach(o=>o({
        ...ctx.request.body,
        isDingtalk:true,
        message:ctx.request.body.text.content,
        groupName:ctx.url.substr(1),
    }));
    //await new Promise(resolve => setTimeout(resolve,3000));
    ctx.body=JSON.stringify({
        "msgtype": "empty"
    });
});

_bot.listen=(port)=>app.listen(port);

_bot.on=(listener,callback)=>onList.push(callback);

_bot.send_msg=(args)=>{
    //console.log(args);
    if(typeof args.message==='string'){
        let translateCQCode=args.message.replace(/\[CQ:image,file=([^\]]*)\]/g,"![screenshot]($1)");
        if(translateCQCode===args.message) {
            args.message={
                "msgtype": "text",
                "text": {content:args.message,},
            }
        }else {
            translateCQCode=translateCQCode.replace(/\n/g,"\n\n");
            args.message={
                "msgtype": "markdown",
                "markdown": {
                    text: translateCQCode, title: translateCQCode
                }
            }
        }
    }
    console.log(args.message);
    if(args.group_id&&!args.group_id.startsWith("http"))args.group_id="https://oapi.dingtalk.com/robot/send?access_token="+args.group_id;
    axios.post(args.group_id||args.sessionWebhook,args.message).then(r=>console.log(r.data));
}

_bot.send_group_msg=_bot.send_msg;

const exec=(fn,...args)=>{
    return _bot[fn](...args);
}

const bot=new Proxy(exec, {
    get(target, p, receiver) {
        return _bot[p];
    }
});

module.exports=bot;
