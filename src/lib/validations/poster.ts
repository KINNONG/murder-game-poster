import { z } from "zod";

export const posterFormSchema = z.object({
  title: z.string().min(1, { message: "请输入剧本名称" }).max(50, { message: "剧本名称不能超过50个字符" }),

  type: z.string().min(1, { message: "请输入剧本类型" }).max(30, { message: "剧本类型不能超过30个字符" }),

  description: z
    .string()
    .min(10, { message: "主要剧情至少需要10个字符" })
    .max(500, { message: "主要剧情不能超过500个字符" }),

  info: z
    .string()
    .min(5, { message: "基本配置信息至少需要5个字符" })
    .max(200, { message: "基本配置信息不能超过200个字符" }),

  review: z
    .string()
    .min(10, { message: "六楼测评至少需要10个字符" })
    .max(300, { message: "六楼测评不能超过300个字符" }),

  coverImage: z.string().nullable(),

  introImage: z.string().nullable(),

  templateType: z.enum(["vintage", "modern", "detective"], {
    required_error: "请选择海报模板类型",
  }),
});
