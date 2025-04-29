"use client";
import { type PosterData } from "@/types/poster";
import { useEffect, useRef, useState } from "react";

interface PosterPreviewProps {
  posterData: PosterData;
}

export default function PosterPreview({ posterData }: PosterPreviewProps) {
  // 直接返回侦探风格海报，不再根据模板类型切换
  return <DetectivePoster posterData={posterData} />;
}

// 侦探风格海报（默认风格）
function DetectivePoster({ posterData }: PosterPreviewProps) {
  const { title, type, description, info, review, coverImage, introImage } = posterData;
  const posterRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // 监听容器尺寸变化，计算并应用缩放比例
  useEffect(() => {
    const updateScale = () => {
      if (!posterRef.current) return;

      // 海报的设计尺寸（基于3:4比例）
      const designWidth = 600; // 假设设计宽度是600px

      // 获取容器当前宽度
      const containerWidth = posterRef.current.clientWidth;

      // 计算缩放比例
      const newScale = containerWidth / designWidth;
      setScale(newScale);
    };

    // 初始化时计算一次
    updateScale();

    // 监听窗口大小变化
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // 创建适配中英文的字体样式
  const mixedFontStyle = {
    fontFamily: "'LianMengQiYi', 'Source Han Sans SC', 'Noto Sans SC', sans-serif",
    fontWeight: 700, // 确保英文显示为粗体
  };

  return (
    <div ref={posterRef} className="w-full">
      {/* 使用固定比例容器 */}
      <div
        id="poster-preview"
        className="relative w-full aspect-[3/4] overflow-hidden detective-font bg-slate-100 border border-gray-200 rounded-md"
      >
        {/* 内部内容容器，应用缩放 */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
          }}
        >
          {/* 背景图片 */}
          <div className="absolute inset-0 w-full h-full">
            <img src={"/images/templates/example.jpg"} alt="背景模板" className="w-full h-full object-cover" />
          </div>

          {/* 回形针图片 */}
          <div className="absolute z-[2]" style={{ right: "10.5rem", top: "7.5rem", transform: "rotate(6deg)" }}>
            <img src={"/images/templates/PaperClip.png"} alt="回形针" className="w-[45px] h-auto" />
          </div>

          {/* 封面图 */}
          {coverImage && (
            <div className="absolute z-[1]" style={{ right: "6rem", top: "9.5rem", transform: "rotate(-4deg)" }}>
              <img src={coverImage} alt="剧本封面" className="w-[115px] aspect-[3/4] object-cover opacity-100" />
            </div>
          )}

          {/* 内容区域 */}
          <div className="relative z-10 flex flex-col h-full p-8">
            {/* 标题区 */}
            <div className="text-start mb-4 absolute" style={{ top: "9rem", left: "5rem" }}>
              <div
                className="inline-block px-6 py-1 mb-3 bg-[#7a1f1f] text-[#fffbd7] font-bold transform skew-x-[-15deg] shadow-[4px_6px_0px_rgba(169,87,66,0.5)]"
                style={{ fontFamily: "'LianMengQiYi', 'Source Han Sans SC', 'Noto Sans SC', sans-serif" }}
              >
                <h1 className="text-[22px] sm:text-[24px] font-bold transform skew-x-[15deg]">{title || "剧本名称"}</h1>
              </div>
              <div
                className="text-[20px] w-[280px] line-clamp-1 text-start ml-2 mt-1 font-medium text-[#6b2026]"
                style={mixedFontStyle}
              >
                {type || "剧本类型"}
              </div>
            </div>

            {/* 剧情描述 */}
            <div className="bg-opacity-60 p-4 absolute" style={{ top: "18.25rem", left: "3.8rem" }}>
              <div>
                <p style={mixedFontStyle} className="text-sm line-clamp-1 text-[#7a1f1f] w-[480px] tracking-[0.15em]">
                  {description ? description.slice(0, 17) : "这里是剧本的主要剧情...".slice(0, 17)}
                </p>
              </div>
              {/* 第二行 */}
              <p
                style={mixedFontStyle}
                className="text-sm line-clamp-4 text-[#7a1f1f] mt-1 w-[28rem] tracking-[0.15em]"
              >
                {description ? description.slice(17) : "这里是剧本的主要剧情...".slice(17)}
              </p>
            </div>

            {/* 基本信息 */}
            <div className="absolute p-3 rounded mb-4" style={{ top: "28rem", left: "4rem" }}>
              <div
                className="text-sm text-[#7a1f1f] whitespace-pre-line font-mono tracking-[0.15em]"
                style={mixedFontStyle}
              >
                {info || "人数、难度、时长等基本信息..."}
              </div>
            </div>

            {/* 剧本介绍图 */}
            <div className="absolute z-[3]" style={{ top: "26.3rem", right: "4.85rem" }}>
              <div className="relative">
                {introImage ? (
                  <img
                    src={introImage}
                    alt="剧本介绍图"
                    className="w-[230px] sm:w-[240px] aspect-[4/3] object-cover transition-all duration-300 ease-in-out"
                    style={{ boxShadow: "3px 4px 10px rgba(0,0,0,0.5)" }}
                  />
                ) : (
                  <div className="w-[230px] sm:w-[240px] aspect-[4/3] bg-black bg-opacity-70 flex items-center justify-center shadow-[4px_6px_0px_rgba(169,87,66,0.5)] transition-all duration-300 ease-in-out">
                    <span className="text-white text-opacity-50 text-sm">剧本介绍图</span>
                  </div>
                )}
              </div>
            </div>

            {/* 测评 */}
            <div className="absolute" style={{ top: "37.5rem", left: "3.8rem", ...mixedFontStyle }}>
              <div className="relative whitespace-pre-line">
                <p className="text-sm line-clamp-5 text-[#7a1f1f] bg-opacity-60 pt-3 px-3 w-[30rem] tracking-[0.15em]">
                  {review || "剧本测评内容..."}
                </p>
              </div>
            </div>

            {/* 底部水印 */}
            {/* <div className="absolute bottom-3 right-3 text-xs text-white">剧本杀海报生成工具</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
