export interface PosterData {
  title: string; // 剧本名称
  type: string; // 剧本类型
  description: string; // 主要剧情
  info: string; // 基本配置信息
  review: string; // 六楼测评
  coverImage: string | null; // 剧本封面图URL
  introImage: string | null; // 剧本介绍图URL（横图，4:3）
  templateType: "vintage" | "modern" | "detective"; // 模板类型
}

export const defaultPosterData: PosterData = {
  title: "盒子先生的秘密商店",
  type: "猎奇还原惊悚本",
  description:
    "你们好，我是这家店铺的老板，可以叫我盒子先生。这些货架上的秘密盲盒，都是其他客人留下来的秘密。所以，我不会收取任何的费用，只接受用秘密交换秘密。老板的声音被闷在黑色盒子里，仍旧是掩不住兴奋与激动，似乎很期待我们能够与他达成交易。奇怪的店铺，奇怪的老板，总能勾起人们的好奇心….",
  info: "人数:4 男 3 女/可反串\n难度:适中\n时长:4 小时左右\n类型:猎奇、还原、惊悚",
  review:
    '货架上摆满的不是商品，而是人们的秘密!这听起来是不是既刺激又神秘?说到角色，这里可没那些纯爱戏码，全是些"重口味"的小伙伴。猎奇、变态、血腥、压抑，还有那种阴暗里爬行的感觉，哈哈简直就是为咱们这些"精神稳定"的朋友量身定制的!推理部分轻松不烧脑，时间也刚刚好，不会让你觉得累。而且，最绝的是，你居然',
  coverImage: null,
  introImage: null,
  templateType: "detective",
};
