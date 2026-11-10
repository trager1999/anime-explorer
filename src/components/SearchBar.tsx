interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-box">
      <span className="search-box__icon" aria-hidden="true">⌕</span>
      <span className="sr-only">Search anime</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search anime, genres, or titles..."
      />
      <kbd>⌘ K</kbd>
    </label>
  );
}
