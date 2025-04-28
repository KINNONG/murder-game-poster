"use client";

import { type PosterData } from "@/types/poster";

interface PosterPreviewProps {
  posterData: PosterData;
}

export default function PosterPreview({ posterData }: PosterPreviewProps) {
  const { templateType } = posterData;

  // 根据模板类型渲染不同风格的海报
  if (templateType === "detective") {
    return <DetectivePoster posterData={posterData} />;
  }

  if (templateType === "vintage") {
    return <VintagePoster posterData={posterData} />;
  }

  return <ModernPoster posterData={posterData} />;
}

// 侦探风格海报（默认风格）
function DetectivePoster({ posterData }: PosterPreviewProps) {
  const { title, type, description, info, review, coverImage, introImage } = posterData;

  // 创建适配中英文的字体样式
  const mixedFontStyle = {
    fontFamily: "'联盟起艺卢帅正锐黑体', 'Source Han Sans SC', 'Noto Sans SC', sans-serif",
    fontWeight: 700, // 确保英文显示为粗体
  };

  return (
    <div id="poster-preview" className="relative w-full aspect-[3/4] overflow-hidden detective-font">
      {/* 使用固定的背景图片 */}
      <div className="absolute inset-0">
        <img src="/images/templates/example.jpg" alt="背景模板" className="w-full h-full object-cover" />
        {/* 添加一个半透明遮罩层以便文字更清晰 */}
      </div>

      {/* 回形针图片 - 始终显示 */}
      <div className="absolute z-[2] right-48 top-34" style={{ transform: "rotate(6deg)" }}>
        <img src="/images/templates/PaperClip.png" alt="回形针" className="w-[45px] h-auto" />
      </div>

      {/* 显示上传的封面图 */}
      {coverImage && (
        <div className="absolute z-[1] right-27 top-42" style={{ transform: "rotate(-4deg)" }}>
          <img src={coverImage} alt="剧本封面" className="w-[130px] h-[180px] object-cover opacity-100" />
        </div>
      )}

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* 标题区 */}
        <div className="text-center mb-4 absolute top-44 left-20">
          <div
            className="inline-block px-6 py-1 mb-3 bg-[#7a1f1f] text-[#fffbd7] font-bold transform skew-x-[-15deg] shadow-[4px_6px_0px_rgba(169,87,66,0.5)]"
            style={{ fontFamily: "'Source Han Sans SC', 'Noto Sans SC', sans-serif" }}
          >
            <h1 className="text-[28px] md:text-[28px] font-bold transform skew-x-[15deg]">{title || "剧本名称"}</h1>
          </div>
          <div
            className="text-[20px] md:text-[20px] text-start ml-4 mt-1 font-medium text-[#6b2026] "
            style={mixedFontStyle}
          >
            {type || "剧本类型"}
          </div>
        </div>

        {/* 剧情描述 */}
        <div className=" bg-opacity-60 p-4 rounded shadow-sm relative mb-4 top-73 left-10">
          <div>
            <p style={mixedFontStyle} className="text-sm line-clamp-1 text-[#7a1f1f] w-[480px] tracking-[0.15em]">
              {description ? description.slice(0, 20) : "这里是剧本的主要剧情...".slice(0, 20)}
            </p>
          </div>
          {/* 第二行 */}
          <p style={mixedFontStyle} className="text-sm line-clamp-4 text-[#7a1f1f] mt-1 w-[500px] tracking-[0.15em]">
            {description ? description.slice(20) : "这里是剧本的主要剧情...".slice(20)}
          </p>
        </div>

        {/* 基本信息 */}
        <div className="absolute p-3 rounded mb-4 top-128 left-18">
          <div
            className="text-sm text-[#7a1f1f] whitespace-pre-line font-mono tracking-[0.15em]"
            style={mixedFontStyle}
          >
            {info || "人数、难度、时长等基本信息..."}
          </div>
        </div>

        {/* 剧本介绍图 - 放在基本配置信息的右边 */}
        <div className="absolute top-116 right-23 z-[3]">
          <div className="relative">
            {introImage ? (
              <img
                src={introImage}
                alt="剧本介绍图"
                className="w-[288px] h-[216px] object-cover shadow-lg"
                style={{ boxShadow: "3px 4px 10px rgba(0,0,0,0.5)" }}
              />
            ) : (
              <div className="w-[288px] h-[216px] bg-black bg-opacity-70 flex items-center justify-center shadow-[4px_6px_0px_rgba(169,87,66,0.5)]">
                <span className="text-white text-opacity-50 text-sm">剧本介绍图</span>
              </div>
            )}
          </div>
        </div>

        {/* 测评 */}
        <div className="absolute top-170 left-20" style={mixedFontStyle}>
          <div className="relative whitespace-pre-line">
            <p className="text-sm line-clamp-6 text-[#7a1f1f] bg-opacity-60 pt-3 px-3 w-[540px] tracking-[0.15em]">
              {review || "剧本测评内容..."}
            </p>

            {/* <div className="absolute -bottom-14 -right-4 w-25 h-25 opacity-50">
              <div className="w-full h-full rounded-full border-2 border-[#7a1f1f] flex items-center justify-center transform rotate-12">
                <span className="text-[#7a1f1f] text-xs font-bold bg-white bg-opacity-80 px-2 py-1 rounded-full">
                  六楼测评章
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* 底部水印 */}
        {/* <div className="absolute bottom-3 right-3 text-xs text-white">剧本杀海报生成工具</div> */}
      </div>
    </div>
  );
}

// 复古风格海报
function VintagePoster({ posterData }: PosterPreviewProps) {
  const { title, type, description, info, review, coverImage, introImage } = posterData;

  // 创建适配中英文的字体样式
  const mixedFontStyle = {
    fontFamily: "'联盟起艺卢帅正锐黑体', 'Source Han Sans SC', 'Noto Sans SC', sans-serif",
    fontWeight: 700, // 确保英文显示为粗体
  };

  return (
    <div id="poster-preview" className="relative w-full aspect-[3/4] overflow-hidden vintage-font">
      {/* 使用渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#752e2e] via-[#4e341f] to-[#3a2a1a]">
        {/* 添加一个复古纹理效果 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E\')',
          }}
        ></div>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* 海报标题 - 用复古印刷效果 */}
        <div className="text-center mb-6">
          <div className="bg-[#8c2a2a] text-white py-2 px-4 inline-block transform -rotate-2 rounded shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider">{title || "剧本名称"}</h1>
          </div>
          <div className="mt-2 text-lg md:text-xl font-medium text-white">{type || "剧本类型"}</div>
        </div>

        {/* 剧情内容区域 */}
        <div className="bg-black bg-opacity-60 p-4 rounded shadow-sm mb-4 border border-[#b2a181]">
          <h2 className="text-xl font-bold text-white mb-2 border-b border-[#b2a181] pb-1">主要剧情</h2>
          <p className="text-sm text-white line-clamp-4" style={mixedFontStyle}>
            {description || "这里是剧本的主要剧情..."}
          </p>
        </div>

        {/* 封面图和介绍图区域 */}
        <div className="flex gap-4 mb-4">
          {/* 基本信息区域 */}
          <div className="bg-black bg-opacity-60 p-3 rounded border-2 border-double border-[#a09173] flex-1">
            <h2 className="text-xl font-bold text-white mb-2">基本信息</h2>
            <div className="text-sm text-white whitespace-pre-line font-mono">
              {info || "人数、难度、时长等基本信息..."}
            </div>
          </div>

          {/* 剧本介绍图 */}
          <div className="relative w-[180px] h-[135px] transform rotate-2">
            <div className="absolute inset-0 border-4 border-[#a09173] opacity-60"></div>
            {introImage ? (
              <img
                src={introImage}
                alt="剧本介绍图"
                className="w-full h-full object-cover"
                style={{ boxShadow: "3px 4px 8px rgba(0,0,0,0.6)" }}
              />
            ) : (
              <div className="w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
                <span className="text-[#a09173] text-opacity-70 text-xs">剧本介绍图</span>
              </div>
            )}
            {/* 装饰角贴纸 */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#8c2a2a] transform rotate-45"></div>
          </div>
        </div>

        {/* 测评区域 */}
        <div className="mt-auto">
          <h2 className="text-xl font-bold text-white mb-2">六楼测评</h2>
          <div className="relative">
            <p
              className="text-sm text-white italic bg-black bg-opacity-60 p-3 border-l-4 border-[#8c2a2a]"
              style={mixedFontStyle}
            >
              {review || "剧本测评内容..."}
            </p>
            {/* 封面图 */}
            {coverImage && (
              <div className="absolute -top-16 -right-2 w-[100px] h-[130px] transform -rotate-6 shadow-xl">
                <img src={coverImage} alt="剧本封面" className="w-full h-full object-cover border-4 border-[#a09173]" />
              </div>
            )}
            {/* 红印章效果 */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-60">
              <div className="w-full h-full rounded-full border-4 border-[#8c2a2a] flex items-center justify-center transform rotate-15">
                <span className="text-[#8c2a2a] text-sm font-bold bg-white bg-opacity-80 px-2 py-1 rounded-full">
                  六楼推荐
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部水印 */}
        <div className="absolute bottom-3 right-3 text-xs text-white">剧本杀海报生成工具</div>
      </div>
    </div>
  );
}

// 现代风格海报
function ModernPoster({ posterData }: PosterPreviewProps) {
  const { title, type, description, info, review, coverImage, introImage } = posterData;

  // 创建适配中英文的字体样式
  const mixedFontStyle = {
    fontFamily: "'联盟起艺卢帅正锐黑体', 'Source Han Sans SC', 'Noto Sans SC', sans-serif",
    fontWeight: 700, // 确保英文显示为粗体
  };

  return (
    <div id="poster-preview" className="relative w-full aspect-[3/4] overflow-hidden modern-font">
      {/* 使用现代感渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        {/* 添加一些现代感几何元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-64 h-64 rounded-full bg-purple-500 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-64 h-64 rounded-full bg-blue-500 blur-3xl bottom-20 right-10"></div>
          <div className="absolute w-32 h-32 rounded-full bg-red-500 blur-2xl top-1/3 right-10"></div>
        </div>
        {/* 添加一个渐变遮罩层以适应现代风格 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
      </div>

      {/* 剧本内容 */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* 头部 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-yellow-300 mb-2">{title || "剧本名称"}</h1>
          <div className="text-lg md:text-xl font-medium text-red-400">{type || "剧本类型"}</div>
        </div>

        {/* 剧情描述 */}
        <div className="mb-4 bg-black bg-opacity-50 p-4 rounded-md">
          <h2 className="text-xl font-bold text-purple-300 mb-2">剧情介绍</h2>
          <p className="text-sm text-white line-clamp-4" style={mixedFontStyle}>
            {description || "这里是剧本的主要剧情..."}
          </p>
        </div>

        {/* 封面图与信息区域并排 */}
        <div className="mb-4 flex gap-4">
          {/* 基本信息 */}
          <div className="flex-1 bg-black bg-opacity-50 p-4 rounded-md">
            <h2 className="text-xl font-bold text-purple-300 mb-2">基本信息</h2>
            <div className="text-sm text-white whitespace-pre-line">{info || "人数、难度、时长等基本信息..."}</div>
          </div>

          {/* 图片区域 */}
          <div className="flex flex-col gap-2 w-[180px]">
            {coverImage && (
              <div className="h-[110px] overflow-hidden rounded-md border border-purple-500">
                <img
                  src={coverImage}
                  alt="剧本封面"
                  className="w-full h-full object-cover"
                  style={{ boxShadow: "0px 3px 8px rgba(0,0,0,0.5)" }}
                />
              </div>
            )}

            <div className="h-[110px] overflow-hidden rounded-md border border-yellow-500">
              {introImage ? (
                <img
                  src={introImage}
                  alt="剧本介绍图"
                  className="w-full h-full object-cover"
                  style={{ boxShadow: "0px 3px 8px rgba(0,0,0,0.5)" }}
                />
              ) : (
                <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-yellow-500 text-opacity-70 text-xs">剧本介绍图</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 测评 */}
        <div className="mt-auto bg-black bg-opacity-50 p-4 rounded-md">
          <h2 className="text-xl font-bold text-purple-300 mb-2">六楼测评</h2>
          <p className="text-sm text-white italic line-clamp-3" style={mixedFontStyle}>
            {review || "剧本测评内容..."}
          </p>
        </div>

        {/* 底部水印 */}
        <div className="absolute bottom-3 right-3 text-xs text-white">剧本杀海报生成工具</div>
      </div>
    </div>
  );
}
