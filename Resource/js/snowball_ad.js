// 雪球去广告优化版
let url = $request.url;
let body = $response.body;

// 只处理匹配到的 URL，减少开销
if (url.includes("timeline_tab_name")) {
    try {
        let obj = JSON.parse(body);

        // 直接用条件判断，避免遍历
        if (obj?.data?.timeline_tab_name?.content) {
            obj.data.timeline_tab_name.content.name = "nnnnjjjj";
            obj.data.timeline_tab_name.update_type = 0;
        }

        if (obj?.data?.trade_guojin_new_system?.content) {
            obj.data.trade_guojin_new_system.content.open = false;
        }

        if (obj?.data?.trade_guolian_new_system?.content) {
            obj.data.trade_guolian_new_system.content.open = false;
        }

        if (obj?.data?.new_ad_engine?.content) {
            obj.data.new_ad_engine.content.value = false;
        }

        if (obj?.data?.home_tab_dynamic?.content) {
            obj.data.home_tab_dynamic.content.switch = false;
            obj.data.home_tab_dynamic.content.icon_url = "";
            obj.data.home_tab_dynamic.content.url = "";
            obj.data.home_tab_dynamic.content.is_web_url = false;
        }

        if (obj?.data?.status_detail_ad_strategy) {
            obj.data.status_detail_ad_strategy.content = [];
        }

        body = JSON.stringify(obj);
        console.log("雪球广告字段已清理 ✅");
        $done({ body });
    } catch (e) {
        console.log("处理 timeline_tab_name 出错: " + e);
        $done({ body });
    }
}

else if (url.includes("/analysis/home/my_tab.json")) {
    try {
        let obj = JSON.parse(body);
        let idx = obj?.data?.list?.findIndex(i => i.id === 40);
        if (idx !== -1) obj.data.list[idx] = {};
        body = JSON.stringify(obj);
        console.log("my_tab.json 已清理 ✅");
        $done({ body });
    } catch (e) {
        console.log("处理 my_tab.json 出错: " + e);
        $done({ body });
    }
}

else {
    $done(); // 其他 URL 不处理
}
