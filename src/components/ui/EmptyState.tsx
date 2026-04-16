interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-700 p-12 text-center flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
        ✦
      </div>
      <div>
        <p className="text-zinc-300 font-medium">{title}</p>
        {description && <p className="text-sm text-zinc-500 mt-1">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2 text-sm font-medium rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
