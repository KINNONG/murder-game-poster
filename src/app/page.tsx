import PosterEditor from "@/components/poster-editor";

export default function Home() {
  return (
    <div className="container py-8 mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 detective-font text-[#7a1f1f]">六楼剧本杀海报生成器</h1>
        <p className="text-muted-foreground text-lg">创建你的神秘侦探风格剧本海报，一键生成，简单分享</p>
      </header>
      <main>
        <PosterEditor />
      </main>
    </div>
  );
}
