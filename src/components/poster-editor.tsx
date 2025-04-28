"use client";

import PosterForm from "@/components/poster/poster-form";
import PosterPreview from "@/components/poster/poster-preview";
import { Button } from "@/components/ui/button";
import { type PosterData, defaultPosterData } from "@/types/poster";
import * as htmlToImage from "html-to-image";
import { useState } from "react";
import { toast } from "sonner";

export default function PosterEditor() {
  const [posterData, setPosterData] = useState<PosterData>(defaultPosterData);
  const [isExporting, setIsExporting] = useState(false);

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

      // 生成图片
      const dataUrl = await htmlToImage.toPng(previewElement, {
        quality: 0.95,
        pixelRatio: 2,
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
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-sm">
        <PosterForm posterData={posterData} onUpdatePoster={handleUpdatePoster} />
      </div>

      <div className="w-full lg:w-7/12 sticky top-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">预览</h2>
          <Button onClick={handleExportImage} disabled={isExporting}>
            {isExporting ? "导出中..." : "导出海报"}
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <PosterPreview posterData={posterData} />
        </div>
      </div>
    </div>
  );
}
