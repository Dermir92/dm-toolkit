import Link from 'next/link';

const generators = [
  { title: 'Campaign Generator', description: 'Premise, conflict, villain, arcs, hooks, and a finale.', icon: '🗺' },
  { title: 'Session Generator',  description: 'Hook, scenes, conflict, twist, reward, and a backup plan.', icon: '📜' },
  { title: 'NPC Generator',      description: 'Name, role, personality, goal, secret, and story connection.', icon: '🧙' },
  { title: 'Encounter Generator',description: 'Enemy type, terrain, complication, twist, and reward.', icon: '⚔' },
  { title: 'Loot Generator',     description: 'Item name, type, flavor, practical use, and hidden hook.', icon: '💎' },
];

const features = [
  {
    title: 'Reroll anything independently',
    description: 'Hate the villain but love the premise? Reroll just that one piece. Every field is its own card.',
  },
  {
    title: 'Edit what you generate',
    description: 'Treat generated content as a starting point. Edit any field inline and make it yours.',
  },
  {
    title: 'Save what matters',
    description: 'Save useful NPCs, hooks, and encounters to your Workspace and reuse them across sessions.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium mb-8">
            Modular DM Assistant
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mb-5 leading-tight tracking-tight">
            Generate fast.{' '}
            <span className="text-amber-400">Prep smarter.</span>
            <br />
            Reuse what matters.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A toolkit for Dungeon Masters who want quick inspiration and real control.
            Every generated block is independently rerollable, editable, and saveable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/generators"
              className="px-7 py-3 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors"
            >
              Start Generating
            </Link>
            <Link
              href="/workspace"
              className="px-7 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-medium text-sm hover:bg-zinc-800 transition-colors"
            >
              Open Workspace
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 text-center mb-10">
          Built for control, not just generation
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-zinc-900 rounded-xl border border-zinc-800 p-7">
              <h3 className="font-semibold text-zinc-100 mb-2">{f.title}</h3>
              <p className="text-base text-zinc-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Generator cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 text-center mb-10">
          Five generators, one workflow
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {generators.map((g) => (
            <Link
              key={g.title}
              href="/generators"
              className="bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/30 p-6 flex items-start gap-4 transition-all group"
            >
              <span className="text-2xl shrink-0 mt-0.5">{g.icon}</span>
              <div>
                <h3 className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors mb-1">
                  {g.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{g.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
