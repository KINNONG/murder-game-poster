"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { posterFormSchema } from "@/lib/validations/poster";
import { type PosterData } from "@/types/poster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PosterFormProps {
  posterData: PosterData;
  onUpdatePoster: (data: PosterData) => void;
}

export default function PosterForm({ posterData, onUpdatePoster }: PosterFormProps) {
  const form = useForm<PosterData>({
    resolver: zodResolver(posterFormSchema),
    defaultValues: posterData,
    mode: "onChange",
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: "coverImage" | "introImage") => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.includes("image/")) {
        toast.error("请上传图片文件");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result.toString();
          form.setValue(fieldName, imageUrl);
          onUpdatePoster({
            ...form.getValues(),
            [fieldName]: imageUrl,
          });
        }
      };
      reader.readAsDataURL(file);
    },
    [form, onUpdatePoster]
  );

  function onSubmit(data: PosterData) {
    onUpdatePoster(data);
    toast.success("海报信息已更新");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="templateType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>海报模板风格</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    onUpdatePoster({
                      ...form.getValues(),
                      templateType: value as PosterData["templateType"],
                    });
                  }}
                  defaultValue={field.value}
                  className="flex space-x-2"
                >
                  {/* <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="vintage" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">复古风</FormLabel>
                  </FormItem> */}
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="detective" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">侦探风</FormLabel>
                  </FormItem>
                  {/* <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="modern" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">现代风</FormLabel>
                  </FormItem> */}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>剧本名称</FormLabel>
              <FormControl>
                <Input
                  placeholder="例如：盒子先生的秘密商店"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onUpdatePoster({
                      ...form.getValues(),
                      title: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>剧本类型</FormLabel>
              <FormControl>
                <Input
                  placeholder="例如：猎奇还原惊悚本"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onUpdatePoster({
                      ...form.getValues(),
                      type: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主要剧情</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="输入剧本的主要剧情描述..."
                  className="min-h-24"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onUpdatePoster({
                      ...form.getValues(),
                      description: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>基本配置信息</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="人数、难度、时长、类型等信息"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onUpdatePoster({
                      ...form.getValues(),
                      info: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>六楼测评</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="输入剧本的测评内容..."
                  className="min-h-20"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onUpdatePoster({
                      ...form.getValues(),
                      review: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>剧本封面</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "coverImage")}
                    className="cursor-pointer"
                  />
                  {field.value && (
                    <div className="relative mt-2 h-full w-full overflow-hidden rounded-md">
                      <img src={field.value} alt="剧本封面预览" className="h-full w-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          form.setValue("coverImage", null);
                          onUpdatePoster({
                            ...form.getValues(),
                            coverImage: null,
                          });
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="introImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>剧本介绍图（横图，比例4:3）</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "introImage")}
                    className="cursor-pointer"
                  />
                  {field.value && (
                    <div className="relative mt-2 h-full w-full overflow-hidden rounded-md">
                      <img src={field.value} alt="剧本介绍图预览" className="h-full w-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          form.setValue("introImage", null);
                          onUpdatePoster({
                            ...form.getValues(),
                            introImage: null,
                          });
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          更新海报
        </Button>
      </form>
    </Form>
  );
}
