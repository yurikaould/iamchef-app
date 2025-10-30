interface IngredientBadgeProps {
  label: string;
  onRemove: (ingredient: string) => void;
}

export default function IngredientBadge({ label, onRemove }: IngredientBadgeProps) {
  return (
    <div className="ingredient-badge" role="listitem">
      <span>{label}</span>
      <button
        className="badge-remove"
        onClick={() => onRemove(label)}
        aria-label={`Remove ${label} ingredient`}
        type="button"
      >
        ×
      </button>
    </div>
  );
}