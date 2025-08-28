// 2023-12-15 14:12:00
let url = $request.url;
let body = $response.body;
console.log('dy123_let url_in ' + url);
console.log('xueqiuxq=========================START================================================');

// 安全赋值函数
function safeSet(obj, path, value) {
  try {
    let keys = path.split('.');
    let lastKey = keys.pop();
    let ref = obj;
    for (let key of keys) {
      if (!(key in ref)) return; // 中途缺失字段，直接跳过
      ref = ref[key];
    }
    if (ref && lastKey in ref) {
      ref[lastKey] = value;
    }
  } catch (e) {
    console.log(`safeSet error on ${path}: ${e}`);
  }
}

if (url.includes("timeline_tab_name")) {
    let obj = JSON.parse(body);

    safeSet(obj, "data.timeline_tab_name.content.name", "nnnnjjjj");
    safeSet(obj, "data.timeline_tab_name.update_type", 0);
    safeSet(obj, "data.profileMenuConfig_anonymous_V12.content.1.list", []);
    safeSet(obj, "data.trade_guojin_new_system.content.open", false);
    safeSet(obj, "data.trade_guolian_new_system.content.open", false);
    safeSet(obj, "data.new_ad_engine.content.value", false);

    safeSet(obj, "data.home_tab_dynamic.content.switch", false);
    safeSet(obj, "data.home_tab_dynamic.content.icon_url", "");
    safeSet(obj, "data.home_tab_dynamic.content.url", "");
    safeSet(obj, "data.home_tab_dynamic.content.is_web_url", false);

    safeSet(obj, "data.trade_open_account_promotion_url", {});
    safeSet(obj, "data.community_ad_download_msg", {});

    safeSet(obj, "data.newhome_market_enable.content.enable", false);
    safeSet(obj, "data.snowpard_ad_switch.content.value", 0);
    safeSet(obj, "data.xq_feed_preload_pic_switch.content.enable", false);
    safeSet(obj, "data.xq_feed_render_animation_switch.content.enable", false);
    safeSet(obj, "data.snowpard_ad_switch_recommend.content.value", 0);
    safeSet(obj, "data.snowpard_ad_switch_search_banner.content.value", 0);
    safeSet(obj, "data.snowpard_ad_switch_detail_comment.content.value", 0);
    safeSet(obj, "data.snowpard_ad_switch_search_text.content.value", 0);
    safeSet(obj, "data.snowpard_ad_switch_recommend_banner.content.value", 0);
    safeSet(obj, "data.status_detail_ad_strategy.content", []);
    safeSet(obj, "data.bee_config_banner_asset.content.value", 0);

    body = JSON.stringify(obj);
    console.log('xq123替换body成功 ' + body);
    $done({ body });
}

else if (url.includes("/analysis/home/my_tab.json")) {
    let obj = JSON.parse(body);
    const index = obj?.data?.list?.findIndex(item => item.id === 40);

    if (index !== -1) {
        obj.data.list[index] = {};
    }

    body = JSON.stringify(obj);
    console.log('xq456替换body成功 ' + body);
    $done({ body });
}

else {
    $done();
    console.log('xq789未匹配到规则 ' + url);
}

console.log('xueqiuxq===============================END==========================================');
