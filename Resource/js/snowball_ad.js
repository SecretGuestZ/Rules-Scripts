// 雪球去广告 - 自动过滤优化版
let url = $request.url;
let body = $response.body;

// 递归清理广告字段
function cleanAds(obj) {
    if (typeof obj !== "object" || obj === null) return obj;

    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        // 匹配 ad / promotion 字段，自动删除
        if (/ad|promotion/i.test(key)) {
            console.log("🧹 删除广告字段:", key);
            delete obj[key];
            continue;
        }

        // 递归处理对象/数组
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map(item => cleanAds(item));
        } else if (typeof obj[key] === "object") {
            obj[key] = cleanAds(obj[key]);
        }
    }
    return obj;
}

// 只处理目标接口
if (/timeline_tab_name|analysis\/home\/my_tab\.json/.test(url)) {
    try {
        let obj = JSON.parse(body);
        obj = cleanAds(obj);
        body = JSON.stringify(obj);
        console.log("✅ 雪球广告清理完成");
        $done({ body });
    } catch (e) {
        console.log("❌ JSON 处理异常:", e.message);
        $done({ body });
    }
} else {
    $done();
}
