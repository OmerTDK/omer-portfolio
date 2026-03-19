import { Warp } from "@paper-design/shaders-react"

export default function WarpShaderHero() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(200, 100%, 20%)", "hsl(160, 100%, 75%)", "hsl(180, 90%, 30%)", "hsl(170, 100%, 80%)"]}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60">Analytics Engineer</p>
          <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-sans font-bold tracking-tight mt-6">
            Omer Zaman
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-sans font-light leading-relaxed max-w-xl mx-auto mt-8">
            Building data pipelines that turn raw chaos into clean insights
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105">
              View my work
            </button>
            <button className="px-8 py-4 bg-white rounded-full text-gray-800 font-medium hover:scale-105 transition-transform duration-300">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
