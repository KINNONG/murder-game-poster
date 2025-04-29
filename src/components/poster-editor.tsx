"use client";

import PosterForm from "@/components/poster/poster-form";
import PosterPreview from "@/components/poster/poster-preview";
import { Button } from "@/components/ui/button";
import { type PosterData, defaultPosterData } from "@/types/poster";
import * as htmlToImage from "html-to-image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PosterEditor() {
  const [posterData, setPosterData] = useState<PosterData>(defaultPosterData);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || "";
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|Mobile/i;
      const isMobileByAgent = mobileRegex.test(userAgent);
      const isMobileByWidth = window.innerWidth < 768;

      setIsMobile(isMobileByAgent || isMobileByWidth);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleUpdatePoster = (newData: PosterData) => {
    setPosterData(newData);
  };

  const handleExportImage = async () => {
    const previewElement = document.getElementById("poster-preview");
    if (!previewElement) {
      toast.error("找不到海报预览元素");
      return;
    }

    try {
      setIsExporting(true);

      // 根据设备类型设置不同的pixelRatio
      const pixelRatio = isMobile ? 4 : 2;

      // 生成图片
      const dataUrl = await htmlToImage.toPng(previewElement, {
        quality: 1,
        pixelRatio,
      });

      // 创建下载链接
      const link = document.createElement("a");
      link.download = `${posterData.title}-剧本杀海报.png`;
      link.href = dataUrl;
      link.click();

      toast.success("海报导出成功！");
    } catch (error) {
      console.error("导出失败:", error);
      toast.error("导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
      <div className="w-full lg:w-5/12 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <PosterForm posterData={posterData} onUpdatePoster={handleUpdatePoster} />
      </div>

      <div className="w-full lg:w-7/12 lg:sticky lg:top-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4 mx-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">预览</h2>
          <Button
            onClick={handleExportImage}
            disabled={isExporting}
            size="sm"
            className="sm:text-sm md:text-base sm:px-4 md:px-6"
          >
            {isExporting ? "导出中..." : "导出海报"}
          </Button>
        </div>

        <div className="bg-white rounded-lg ">
          <div className="max-w-[400px] sm:max-w-[500px] md:max-w-none mx-auto">
            <PosterPreview posterData={posterData} />
          </div>
        </div>
      </div>
    </div>
  );
}
