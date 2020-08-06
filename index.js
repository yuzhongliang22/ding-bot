const koa=require("koa");
const bodyparser=require("koa-bodyparser");
const axios=require("axios");


let app=new koa();

const _bot={};

const onList=[];

app.use(bodyparser());

app.use(async (ctx,next)=>{
    console.log(ctx.url);
    console.log(ctx.request.body);
    onList.forEach(o=>o({
        ...ctx.request.body,
        isDingtalk:true,
        message:ctx.request.body.text.content,
    }));
    //await new Promise(resolve => setTimeout(resolve,3000));
    ctx.body=JSON.stringify({
        "msgtype": "empty"
    });
});

_bot.listen=(port)=>app.listen(port);

_bot.on=(listener,callback)=>onList.push(callback);

_bot.send_msg=(args)=>{
    console.log(args);
    if(typeof args.message==='string'){
        args.message={
            "msgtype": "text",
            "text": {content:args.message,},
        }
    }
    console.log(args.message);
    axios.post(args.group||args.sessionWebhook,args.message).then(r=>console.log(r.data));
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
